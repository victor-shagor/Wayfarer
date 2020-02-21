"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable radix */

/* eslint-disable camelcase */
var trip = {
  create: function create(req, res) {
    var _req$body = req.body,
        origin = _req$body.origin,
        destination = _req$body.destination,
        trip_date = _req$body.trip_date,
        fare = _req$body.fare;
    var bus_id = parseInt(req.body.bus_id);

    _config["default"].query('INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [bus_id, origin, destination, trip_date, fare, 'active'], function (_error, result) {
      res.status(201).json({
        status: 'success',
        data: result.rows[0]
      });
    });
  },
  getTrips: function getTrips(req, res) {
    var _req$query = req.query,
        origin = _req$query.origin,
        destination = _req$query.destination;

    var decoded = _jsonwebtoken["default"].decode(req.headers.token, {
      complete: true
    });

    _config["default"].query('SELECT trip_id FROM bookings WHERE user_id =$1', [decoded.payload.user_id], function (error, result) {
      console.log(result.rows);

      if (origin && !destination) {
        _config["default"].query('SELECT * FROM trips WHERE origin =$1', [origin], function (_error, results) {
          var newTrips = _helper["default"].Filter(result.rows, results.rows);

          return res.status(200).json({
            status: 'success',
            data: newTrips
          });
        });
      }

      if (destination && !origin) {
        _config["default"].query('SELECT * FROM trips WHERE destination =$1', [destination], function (_error, results) {
          var newTrips = _helper["default"].Filter(result.rows, results.rows);

          res.status(200).json({
            status: 'success',
            data: newTrips
          });
        });
      }

      if (destination && origin) {
        _config["default"].query('SELECT * FROM trips WHERE destination =$1 AND origin=$2', [destination, origin], function (_error, resul) {
          var newTrips = _helper["default"].Filter(result.rows, resul.rows);

          res.status(200).json({
            status: 'success',
            data: newTrips
          });
        });
      }

      if (!destination && !origin) {
        _config["default"].query('SELECT * FROM trips', function (_error, results) {
          var newTrips = _helper["default"].Filter(result.rows, results.rows);

          res.status(200).json({
            status: 'success',
            data: newTrips
          });
        });
      }
    });
  },
  book: function book(req, res) {
    var decoded = _jsonwebtoken["default"].decode(req.headers.token, {
      complete: true
    });

    var created_on = new Date();
    var trip_id = req.body.trip_id;
    var user_id = decoded.payload.user_id;

    _config["default"].query('SELECT id, bus_id, trip_date, destination, origin FROM trips WHERE id =$1', [trip_id], function (_err, results) {
      var _results$rows$ = results.rows[0],
          bus_id = _results$rows$.bus_id,
          trip_date = _results$rows$.trip_date,
          destination = _results$rows$.destination,
          origin = _results$rows$.origin;

      _config["default"].query('SELECT * FROM users WHERE user_id =$1', [user_id], function (_errr, user) {
        var _user$rows$ = user.rows[0],
            first_name = _user$rows$.first_name,
            last_name = _user$rows$.last_name,
            email = _user$rows$.email;

        _config["default"].query('SELECT seat_number FROM bookings WHERE trip_id =$1', [trip_id], function (_errr, seat) {
          var seat_number = seat.rows.length + 1;

          _config["default"].query('INSERT INTO bookings (trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email, status, origin, destination, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', [trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email, 'active', origin, destination, created_on], function (_error, result) {
            return res.status(201).json({
              status: 'success',
              data: result.rows[0]
            });
          });

          _helper["default"].generateNotification(decoded.payload.email, decoded.payload.first_name);
        });
      });
    });
  },
  getBookings: function getBookings(req, res) {
    var decoded = _jsonwebtoken["default"].decode(req.headers.token, {
      complete: true
    });

    var _req$query2 = req.query,
        origin = _req$query2.origin,
        destination = _req$query2.destination;

    if (origin && !destination) {
      if (decoded.payload.is_admin === true) {
        _config["default"].query('SELECT * FROM bookings WHERE origin=$1', [origin], function (_error, results) {
          return res.status(200).json({
            status: 'success',
            data: results.rows
          });
        });
      } else {
        _config["default"].query('SELECT * FROM bookings WHERE user_id=$1 AND origin =$2', [decoded.payload.user_id, origin], function (_error, results) {
          return res.status(200).json({
            status: 'success',
            data: results.rows
          });
        });
      }
    }

    if (destination && !origin) {
      if (decoded.payload.is_admin === true) {
        _config["default"].query('SELECT * FROM bookings WHERE destination =$1', [destination], function (_error, results) {
          return res.status(200).json({
            status: 'success',
            data: results.rows
          });
        });
      } else {
        _config["default"].query('SELECT * FROM bookings WHERE user_id=$1 AND destination =$2', [decoded.payload.user_id, destination], function (_error, results) {
          return res.status(200).json({
            status: 'success',
            data: results.rows
          });
        });
      }
    }

    if (destination && origin) {
      if (decoded.payload.is_admin === true) {
        _config["default"].query('SELECT * FROM bookings WHERE destination =$1 AND origin=$2', [destination, origin], function (_error, results) {
          return res.status(200).json({
            status: 'success',
            data: results.rows
          });
        });
      } else {
        _config["default"].query('SELECT * FROM bookings WHERE user_id=$1 AND destination =$2 AND origin=$3', [decoded.payload.user_id, destination, origin], function (_error, resul) {
          return res.status(200).json({
            status: 'success',
            data: resul.rows
          });
        });
      }
    }

    if (!destination && !origin) {
      if (decoded.payload.is_admin === true) {
        _config["default"].query('SELECT * FROM bookings', function (_error, results) {
          return res.status(200).json({
            status: 'success',
            data: results.rows
          });
        });
      } else {
        _config["default"].query('SELECT * FROM bookings WHERE user_id =$1', [decoded.payload.user_id], function (_error, results) {
          return res.status(200).json({
            status: 'success',
            data: results.rows
          });
        });
      }
    }
  },
  deleteBookings: function deleteBookings(req, res) {
    var id = parseInt(req.params.booking_id);

    var decoded = _jsonwebtoken["default"].decode(req.headers.token, {
      complete: true
    });

    _config["default"].query('DELETE FROM bookings WHERE user_id =$1 AND id =$2', [decoded.payload.user_id, id], function () {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Booking deleted successfully'
        }
      });
    });
  },
  cancelTrip: function cancelTrip(req, res) {
    var id = parseInt(req.params.trip_id);

    _config["default"].query('UPDATE trips SET status = $1 WHERE id = $2', ['cancelled', id], function () {
      _config["default"].query('UPDATE bookings SET status = $1 WHERE trip_id = $2', ['cancelled', id], function () {
        res.status(200).json({
          status: 200,
          data: {
            message: 'Trip cancelled successfully'
          }
        });
      });
    });
  },
  getFilterTrips: function getFilterTrips(req, res) {
    var origin = req.body.origin;
    var destination = req.body.destination;

    if (origin && !destination) {
      _config["default"].query('SELECT * FROM trips WHERE origin =$1', [origin], function (_error, results) {
        return res.status(200).json({
          status: 'success',
          data: results.rows
        });
      });
    }

    if (destination && !origin) {
      _config["default"].query('SELECT * FROM trips WHERE destination =$1', [destination], function (_error, results) {
        return res.status(200).json({
          status: 'success',
          data: results.rows
        });
      });
    }

    if (destination && origin) {
      _config["default"].query('SELECT * FROM trips WHERE destination =$1 AND origin=$2', [destination, origin], function (_error, resul) {
        return res.status(200).json({
          status: 'success',
          data: resul.rows
        });
      });
    }
  },
  changeSeat: function changeSeat(req, res) {
    var decoded = _jsonwebtoken["default"].decode(req.headers.token, {
      complete: true
    });

    var created_on = new Date();
    var _req$body2 = req.body,
        trip_id = _req$body2.trip_id,
        seat_number = _req$body2.seat_number;
    var user_id = decoded.payload.user_id;

    _config["default"].query('SELECT id, bus_id, trip_date FROM trips WHERE id =$1', [trip_id], function (_err, results) {
      var _results$rows$2 = results.rows[0],
          bus_id = _results$rows$2.bus_id,
          trip_date = _results$rows$2.trip_date;

      _config["default"].query('SELECT * FROM users WHERE user_id =$1', [user_id], function (_errr, user) {
        var _user$rows$2 = user.rows[0],
            first_name = _user$rows$2.first_name,
            last_name = _user$rows$2.last_name,
            email = _user$rows$2.email;

        _config["default"].query('INSERT INTO bookings (trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email, status, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email, 'active', created_on], function (_error, result) {
          return res.status(201).json({
            status: 'success',
            data: result.rows[0]
          });
        });
      });
    });
  }
};
var _default = trip;
exports["default"] = _default;