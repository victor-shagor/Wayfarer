/* eslint-disable max-len */
/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import Helper from '../helpers/helper';
import pool from '../config';

const User = {
  create(req, res) {
    const { email, first_name, last_name } = req.body;
    const is_admin = false;
    const password = Helper.hashPassword(req.body.password);
    pool.query('SELECT * FROM users WHERE email = $1 ', [email], (error, result) => {
      if (result.rows[0]) {
        if (result.rows[0].is_verified === false) {
          const token = Helper.generateToken(result.rows[0].user_id, result.rows[0].email, result.rows[0].is_admin, result.rows[0].first_name);
          Helper.generateAuthEmail(result.rows[0].email, result.rows[0].first_name, token);
          return res.status(201).json({
            status: 201,
            message: 'An email has been sent to your '
          + 'email address. Please check your email to complete '
          + 'registration',
          });
        }
      }
    });
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
        res.status(201).json({
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
      const token = Helper.generateToken(user_id, email, is_admin, first_name);
      const data = {
        user_id,
        is_admin,
        token,
        email,
        first_name,
        last_name,
      };
      res.status(200).json({
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
        res.status(200).json({
          status: 200,
          data,
        });
      });
    });
  },
  googleLogin(req, res) {
    const { email, first_name, last_name, google_id } = req.body;
    const is_admin = false;
    pool.query('SELECT * FROM users WHERE email = $1 ', [email], (error, exist) => {
      if(exist.rows[0]){
        if(!exist.rows[0].google_id){
      return res.status(400).json({
        status: 400,
        error: "User already exist"
      });
    }
      if (exist.rows[0].google_id) {
          const token = Helper.generateToken(exist.rows[0].user_id, exist.rows[0].email, exist.rows[0].is_admin, exist.rows[0].first_name);
          const data = {
            user_id: exist.rows[0].user_id,
            is_admin,
            token,
            email,
            first_name,
            last_name,
          };
          return res.status(200).json({
            status: 200,
            data,
          });
      }
  }
  
  pool.query('INSERT INTO users (first_name, last_name, email,google_id, is_admin, is_verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
  [first_name, last_name, email, google_id, is_admin, false], (error, results) => {
    const { user_id } = results.rows[0];
    const data = {
      user_id,
      is_admin,
      token: Helper.generateToken(user_id, email, is_admin),
      email,
      first_name,
      last_name,
    };
    res.status(200).json({
      status: 200,
        data,
      });
  });   
  })
  },
  facebookLogin(req, res) {
    const { email, first_name, last_name, facebook_id } = req.body;
    const is_admin = false;
    pool.query('SELECT * FROM users WHERE email = $1 ', [email], (error, exist) => {
      if(exist){
      return res.status(400).json({
        status: 400,
        error: "User already exist"
      });
    }
    })
    pool.query('SELECT * FROM users WHERE facebook_id = $1 ', [facebook_id], (error, result) => {
      if (result.rows[0]) {
          const token = Helper.generateToken(result.rows[0].user_id, result.rows[0].email, result.rows[0].is_admin, result.rows[0].first_name);
          const data = {
            user_id: result.rows[0].user_id,
            is_admin,
            token,
            email,
            first_name,
            last_name,
          };
          return res.status(200).json({
            status: 200,
            data,
          });
      }
    });
    pool.query('INSERT INTO users (first_name, last_name, email,facebook_id, is_admin, is_verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
      [first_name, last_name, email, facebook_id, is_admin, false], (error, results) => {
        const { user_id } = results.rows[0];
        const data = {
          user_id,
          is_admin,
          token: Helper.generateToken(user_id, email, is_admin),
          email,
          first_name,
          last_name,
        };
        res.status(200).json({
          status: 200,
            data,
          });
      });
  },
};
export default User;
