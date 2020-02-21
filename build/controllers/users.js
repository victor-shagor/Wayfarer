"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/* eslint-disable camelcase */
var User = {
  create: function create(req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        first_name = _req$body.first_name,
        last_name = _req$body.last_name;
    var is_admin = false;

    var password = _helper["default"].hashPassword(req.body.password);

    _config["default"].query('SELECT * FROM users WHERE email = $1 ', [email], function (error, result) {
      if (result.rows[0]) {
        if (result.rows[0].is_verified === false) {
          var token = _helper["default"].generateToken(result.rows[0].user_id, result.rows[0].email, result.rows[0].is_admin, result.rows[0].first_name);

          _helper["default"].generateAuthEmail(result.rows[0].email, result.rows[0].first_name, token);

          return res.status(201).json({
            status: 201,
            message: 'An email has been sent to your ' + 'email address. Please check your email to complete ' + 'registration'
          });
        }
      }
    });

    _config["default"].query('INSERT INTO users (first_name, last_name, email, password, is_admin, is_verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id', [first_name, last_name, email, password, is_admin, false], function (error, results) {
      var user_id = results.rows[0].user_id;
      var data = {
        user_id: user_id,
        is_admin: is_admin,
        token: _helper["default"].generateToken(user_id, email, is_admin),
        email: email,
        first_name: first_name,
        last_name: last_name
      };

      _helper["default"].generateAuthEmail(data.email, data.first_name, data.token);

      res.status(201).json({
        status: 201,
        message: 'An email has been sent to your ' + 'email address. Please check your email to complete ' + 'registration'
      });
    });
  },
  signin: function signin(req, res) {
    var email = req.body.email;

    _config["default"].query('SELECT * FROM users WHERE email = $1', [email], function (error, results) {
      var _results$rows$ = results.rows[0],
          user_id = _results$rows$.user_id,
          is_admin = _results$rows$.is_admin,
          first_name = _results$rows$.first_name,
          last_name = _results$rows$.last_name;

      var token = _helper["default"].generateToken(user_id, email, is_admin, first_name);

      var data = {
        user_id: user_id,
        is_admin: is_admin,
        token: token,
        email: email,
        first_name: first_name,
        last_name: last_name
      };
      res.status(200).json({
        status: 200,
        data: data
      });
    });
  },
  verifyEmail: function verifyEmail(req, res) {
    var decoded = _jsonwebtoken["default"].decode(req.query.token, {
      complete: true
    });

    _config["default"].query('UPDATE users SET is_verified= $1 WHERE user_id = $2', [true, decoded.payload.user_id], function (error, results) {
      _config["default"].query('SELECT * FROM users WHERE email = $1', [decoded.payload.email], function (err, verified) {
        var _verified$rows$ = verified.rows[0],
            user_id = _verified$rows$.user_id,
            is_admin = _verified$rows$.is_admin,
            first_name = _verified$rows$.first_name,
            last_name = _verified$rows$.last_name,
            email = _verified$rows$.email;

        var token = _helper["default"].generateToken(user_id, email, is_admin);

        var data = {
          user_id: user_id,
          is_admin: is_admin,
          token: token,
          email: email,
          first_name: first_name,
          last_name: last_name
        };
        res.status(200).json({
          status: 200,
          data: data
        });
      });
    });
  }
};
var _default = User;
exports["default"] = _default;