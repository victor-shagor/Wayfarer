/* eslint-disable camelcase */
import Helper from '../helpers/helper';
import pool from '../config';

const User = {
  create(req, res) {
    const { email, first_name, last_name } = req.body;
    const is_admin = false;
    const password = Helper.hashPassword(req.body.password);
    pool.query('INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING user_id', [first_name, last_name, email, password, is_admin], (error, results) => {
      if (error) {
        throw error;
      }
      const { user_id } = results.rows[0];
      const data = {
        user_id,
        is_admin,
        token: Helper.generateToken(user_id, email, is_admin),
        email,
        first_name,
        last_name,
      };
      res.status(201).send({
        status: 201,
        data,
      });
    });
  },
};
export default User;
