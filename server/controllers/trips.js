/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';

import pool from '../config';

const trip = {
  create(req, res) {
    const { origin, destination, trip_date, fare } = req.body;
    const bus_id = parseInt(req.body.bus_id);
    pool.query('INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [bus_id, origin, destination, trip_date, fare, 'active'], (error, result) => {
        if (error) {
          throw error;
        }
        res.status(201).send({
          status: 'success',
          data: result.rows[0],
        });
      });
  },
  getTrips(req, res) {
    pool.query('SELECT * FROM trips', (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(200).send({
        status: 'success',
        data: results.rows,
      });
    });
  },
};
export default trip;
 