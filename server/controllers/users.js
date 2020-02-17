/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import Helper from '../helpers/helper';
import pool from '../config';

const User = {
  create(req, res) {
    const { email, first_name, last_name } = req.body;
    const is_admin = false;
    const password = Helper.hashPassword(req.body.password);
    pool.query('INSERT INTO users (first_name, last_name, email, password, is_admin, is_verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
      [first_name, last_name, email, password, is_admin, false], (error, results) => {
        const { user_id } = results.rows[0];
        const data = {
          user_id,
          is_admin,
          token: Helper.generateToken(user_id, email, is_admin),
          email,
          first_name,
          last_name,
        };
        Helper.generateAuthEmail(data.email, data.first_name, data.token);
        res.status(201).send({
          status: 201,
          message: 'An email has been sent to your '
          + 'email address. Please check your email to complete '
          + 'registration',
        });
      });
  },
  signin(req, res) {
    const { email } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      const {
        user_id, is_admin, first_name, last_name,
      } = results.rows[0];
      const token = Helper.generateToken(user_id, email, is_admin);
      const data = {
        user_id,
        is_admin,
        token,
        email,
        first_name,
        last_name,
      };
      res.status(200).send({
        status: 200,
        data,
      });
    });
  },
  verifyEmail(req, res) {
    const decoded = jwt.decode(req.query.token, { complete: true });
    pool.query('UPDATE users SET is_verified= $1 WHERE user_id = $2', [true, decoded.payload.user_id], (error, results) => {
      pool.query('SELECT * FROM users WHERE email = $1', [decoded.payload.email], (err, verified) => {
        const {
          user_id, is_admin, first_name, last_name, email,
        } = verified.rows[0];
        const token = Helper.generateToken(user_id, email, is_admin);
        const data = {
          user_id,
          is_admin,
          token,
          email,
          first_name,
          last_name,
        };
        res.status(200).send({
          status: 200,
          data,
        });
      });
    });
  },
};
export default User;
