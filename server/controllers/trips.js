/* eslint-disable radix */
/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import helper from '../helpers/helper';

import pool from '../config';
import Helper from '../helpers/helper';

const trip = {
  create(req, res) {
    const {
      origin, destination, trip_date, fare,
    } = req.body;
    const bus_id = parseInt(req.body.bus_id);
    pool.query('INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [bus_id, origin, destination, trip_date, fare, 'active'], (_error, result) => {
        res.status(201).json({
          status: 'success',
          data: result.rows[0],
        });
      });
  },
  getTrips(req, res) {
    const { origin, destination } = req.query;
    const decoded = jwt.decode(req.headers.token, { complete: true });
    pool.query('SELECT trip_id FROM bookings WHERE user_id =$1', [decoded.payload.user_id], (error, result) => {
      console.log(result.rows);
      
      if (origin && !destination) {
        pool.query('SELECT * FROM trips WHERE origin =$1', [origin], (_error, results) => {
          const newTrips = helper.Filter(result.rows, results.rows);
          return res.status(200).json({
            status: 'success',
            data: newTrips,
          });
        });
      }
      if (destination && !origin) {
        pool.query('SELECT * FROM trips WHERE destination =$1', [destination], (_error, results) => {
          const newTrips = helper.Filter(result.rows, results.rows);
          res.status(200).json({
            status: 'success',
            data: newTrips,
          });
        });
      }
      if (destination && origin) {
        pool.query('SELECT * FROM trips WHERE destination =$1 AND origin=$2', [destination, origin], (_error, resul) => {
          const newTrips = helper.Filter(result.rows, resul.rows);
          res.status(200).json({
            status: 'success',
            data: newTrips,
          });
        });
      }
      if (!destination && !origin) {
        pool.query('SELECT * FROM trips', (_error, results) => {
          const newTrips = helper.Filter(result.rows, results.rows);
          res.status(200).json({
            status: 'success',
            data: newTrips,
          });
        });
      }
    });
  },
  book(req, res) {
    const decoded = jwt.decode(req.headers.token, { complete: true });
    const created_on = new Date();
    const { trip_id } = req.body;
    const { user_id } = decoded.payload;
    pool.query('SELECT id, bus_id, trip_date, destination, origin FROM trips WHERE id =$1', [trip_id], (_err, results) => {
      const { bus_id, trip_date, destination, origin } = results.rows[0];
      

      pool.query('SELECT * FROM users WHERE user_id =$1', [user_id], (_errr, user) => {
        const { first_name, last_name, email } = user.rows[0];

        pool.query('SELECT seat_number FROM bookings WHERE trip_id =$1', [trip_id], (_errr, seat) => {
          const seat_number = seat.rows.length + 1;
          pool.query('INSERT INTO bookings (trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email, status, origin, destination, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email, 'active', origin, destination, created_on], (_error, result) => res.status(201).json({
              status: 'success',
              data: result.rows[0],
            }));
          Helper.generateNotification(decoded.payload.email, decoded.payload.first_name);
        });
      });
    });
  },
  getBookings(req, res) {
    const decoded = jwt.decode(req.headers.token, { complete: true });
    const { origin, destination } = req.query;
    if (origin && !destination) {
      if (decoded.payload.is_admin === true) {
        pool.query('SELECT * FROM bookings WHERE origin=$1', [origin], (_error, results) => res.status(200).json({
          status: 'success',
          data: results.rows,
        }));
      } else {
        pool.query('SELECT * FROM bookings WHERE user_id=$1 AND origin =$2', [decoded.payload.user_id, origin], (_error, results) => res.status(200).json({
          status: 'success',
          data: results.rows,
        }));
      }
    }
    if (destination && !origin) {
      if (decoded.payload.is_admin === true) {
        pool.query('SELECT * FROM bookings WHERE destination =$1', [destination], (_error, results) => res.status(200).json({
          status: 'success',
          data: results.rows,
        }));
      } else {
        pool.query('SELECT * FROM bookings WHERE user_id=$1 AND destination =$2', [decoded.payload.user_id, destination], (_error, results) => res.status(200).json({
          status: 'success',
          data: results.rows,
        }));
      }
    }
    if (destination && origin) {
      if (decoded.payload.is_admin === true) {
        pool.query('SELECT * FROM bookings WHERE destination =$1 AND origin=$2', [destination, origin], (_error, results) => res.status(200).json({
          status: 'success',
          data: results.rows,
        }));
      } else {
        pool.query('SELECT * FROM bookings WHERE user_id=$1 AND destination =$2 AND origin=$3', [decoded.payload.user_id, destination, origin], (_error, resul) => res.status(200).json({
          status: 'success',
          data: resul.rows,
        }));
      }
    }
    if (!destination && !origin) {
      if (decoded.payload.is_admin === true) {
        pool.query('SELECT * FROM bookings', (_error, results) => res.status(200).json({
          status: 'success',
          data: results.rows,
        }));
      } else {
        pool.query('SELECT * FROM bookings WHERE user_id =$1', [decoded.payload.user_id], (_error, results) => res.status(200).json({
          status: 'success',
          data: results.rows,
        }));
      }
    }
  },
  deleteBookings(req, res) {
    const id = parseInt(req.params.booking_id);
    const decoded = jwt.decode(req.headers.token, { complete: true });
    pool.query('DELETE FROM bookings WHERE user_id =$1 AND id =$2', [decoded.payload.user_id, id], () => {
      res.status(200).json({
        status: 'success',
        data: { message: 'Booking deleted successfully' },
      });
    });
  },
  cancelTrip(req, res) {
    const id = parseInt(req.params.trip_id);
    pool.query('UPDATE trips SET status = $1 WHERE id = $2', ['cancelled', id], () => {
      pool.query('UPDATE bookings SET status = $1 WHERE trip_id = $2', ['cancelled', id], () => {
        res.status(200).json({
          status: 200,
          data: { message: 'Trip cancelled successfully' },
        });
      });
    });
  },
  getFilterTrips(req, res) {
    const { origin } = req.body;
    const { destination } = req.body;
    if (origin && !destination) {
      pool.query('SELECT * FROM trips WHERE origin =$1', [origin], (_error, results) => res.status(200).json({
        status: 'success',
        data: results.rows,
      }));
    }
    if (destination && !origin) {
      pool.query('SELECT * FROM trips WHERE destination =$1', [destination], (_error, results) => res.status(200).json({
        status: 'success',
        data: results.rows,
      }));
    }
    if (destination && origin) {
      pool.query('SELECT * FROM trips WHERE destination =$1 AND origin=$2', [destination, origin], (_error, resul) => res.status(200).json({
        status: 'success',
        data: resul.rows,
      }));
    }
  },
  changeSeat(req, res) {
    const decoded = jwt.decode(req.headers.token, { complete: true });
    const created_on = new Date();
    const { trip_id, seat_number } = req.body;
    const { user_id } = decoded.payload;
    pool.query('SELECT id, bus_id, trip_date FROM trips WHERE id =$1', [trip_id], (_err, results) => {
      const { bus_id, trip_date } = results.rows[0];

      pool.query('SELECT * FROM users WHERE user_id =$1', [user_id], (_errr, user) => {
        const { first_name, last_name, email } = user.rows[0];

        pool.query('INSERT INTO bookings (trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email, status, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
          [trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email, 'active', created_on], (_error, result) => res.status(201).json({
            status: 'success',
            data: result.rows[0],
          }));
      });
    });
  },
};
export default trip;
