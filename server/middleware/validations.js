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
};
export default validate;
