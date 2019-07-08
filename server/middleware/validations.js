/* eslint-disable camelcase */
import validator from 'validator';
import jwt from 'jsonwebtoken';

import Helper from '../helpers/helper';
import pool from '../config';


const validate = {
  verifyInput(req, res, next) {
    const requiredFields = ['first_name', 'last_name', 'email', 'password'];
    const missingFields = [];
    requiredFields.forEach((fields) => {
      if (req.body[fields] === undefined) {
        missingFields.push(fields);
      }
    });
    if (missingFields.length !== 0) {
      return res.status(400).send({
        status: 'error',
        error: 'The following field(s) is/are required',
        fields: missingFields,
      });
    }
    const {
      first_name, last_name, email, password,
    } = req.body;
    if (!validator.isAlpha(first_name) || !validator.isAlpha(last_name)
   || !validator.isLength(first_name, { min: 3 }) || !validator.isLength(last_name, { min: 3 })) {
      return res.status(400).send({
        status: 'error',
        error: 'Your names can only be in alphabets and must contain atleast three characters',
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).send({
        status: 'error',
        error: 'please enter a valid email address',
      });
    }
    if (!Helper.isValidPassword(password) || !validator.isLength(password, { min: 8 })) {
      return res.status(400).send({
        status: 'error',
        error: 'Your password must contain atleast 8 characters and must include atleast one number(symbols are not allowed)',
      });
    }
    pool.query('SELECT email FROM users WHERE email = $1 ', [email], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows[0]) {
        return res.status(409).send({
          status: 'error',
          error: 'This email has already being used',
        });
      }
      next();
    });
  },
  verifySignin(req, res, next) {
    const { password, email } = req.body;
    if (password === undefined || email === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Email and password is required',
      });
    }
    if (validator.isEmpty(password) || validator.isEmpty(email)) {
      return res.status(400).send({
        status: 'error',
        error: 'please provide email and password',
      });
    }
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error;
      }
      if (!results.rows[0] || !Helper.comparePassword(results.rows[0].password, password)) {
        return res.status(400).send({
          status: 'error',
          error: 'Email/password is incorrect',
        });
      }
      return next();
    });
  },
  verifyTrip(req, res, next) {
    const {
      bus_id, trip_date, fare, origin, destination,
    } = req.body;
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const requiredFields = ['bus_id', 'origin', 'destination', 'trip_date', 'fare'];
    const missingFields = [];
    requiredFields.forEach((fields) => {
      if (req.body[fields] === undefined) {
        missingFields.push(fields);
      }
    });
    if (missingFields.length !== 0) {
      return res.status(400).send({
        status: 'error',
        error: 'The following field(s) is/are required',
        fields: missingFields,
      });
    }
    if (!validator.isAlphanumeric(origin) || !validator.isAlphanumeric(destination)) {
      return res.status(400).send({
        status: 'error',
        error: 'origin/destination cannot be empty',
      });
    }
    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(trip_date) || validator.isEmpty(trip_date)) {
      return res.status(400).send({
        status: 'error',
        error: 'Trip_date can only be a date in MM/DD/YYYY format',
      });
    }
    if (!validator.isFloat(fare) || !Helper.isValidNumber(bus_id) || fare < 1) {
      return res.status(400).send({
        status: 'error',
        error: 'Bus id and fare can only be a number',
      });
    }
    if (new Date(trip_date) < date) {
      return res.status(400).send({
        status: 'error',
        error: 'Trip_date cannot be lesser than the present date',
      });
    }
    pool.query('SELECT id FROM bus WHERE id = $1', [bus_id], (error, results) => {
      if (!results.rows[0]) {
        return res.status(404).send({
          status: 'error',
          error: `Bus with id:${bus_id} not found`,
        });
      }
      pool.query('SELECT bus_id FROM trips WHERE bus_id = $1', [bus_id], (err, result) => {
        if (result.rows[0]) {
          return res.status(409).send({
            status: 'error',
            error: `Bus with id:${bus_id} already assigned to a trip`,
          });
        }
        return next();
      });
    });
  },
};
export default validate;
