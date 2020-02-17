"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable camelcase */
var validateUser = {
  verifyInput: function verifyInput(req, res, next) {
    var requiredFields = ['first_name', 'last_name', 'email', 'password'];
    var missingFields = [];
    requiredFields.forEach(function (fields) {
      if (req.body[fields] === undefined) {
        missingFields.push(fields);
      }
    });

    if (missingFields.length !== 0) {
      return res.status(400).send({
        status: 'error',
        error: 'The following field(s) is/are required',
        fields: missingFields
      });
    }

    var _req$body = req.body,
        first_name = _req$body.first_name,
        last_name = _req$body.last_name,
        email = _req$body.email,
        password = _req$body.password;

    if (!_validator["default"].isAlpha(first_name) || !_validator["default"].isAlpha(last_name)) {
      return res.status(400).send({
        status: 'error',
        error: 'Your names can only be in alphabets'
      });
    }

    if (!_validator["default"].isEmail(email)) {
      return res.status(400).send({
        status: 'error',
        error: 'please enter a valid email address'
      });
    }

    if (!password || !_validator["default"].isLength(password, {
      min: 5
    })) {
      return res.status(400).send({
        status: 'error',
        error: 'Your password cannot be less than 5 characters'
      });
    }

    _config["default"].query('SELECT email FROM users WHERE email = $1 ', [email], function (error, results) {
      if (results.rows[0]) {
        if (results.rows[0].is_verified === false) {
          return res.status(400).send({
            status: 'error',
            error: 'You had started the registration ' + 'process earlier. ' + 'An email has been sent to your email address. ' + 'Please check your email to complete your registration.'
          });
        }

        return res.status(409).send({
          status: 'error',
          error: 'This email has already being used kindly procced to login'
        });
      }

      next();
    });
  },
  verifySignin: function verifySignin(req, res, next) {
    var _req$body2 = req.body,
        password = _req$body2.password,
        email = _req$body2.email;

    if (password === undefined || email === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Email and password is required'
      });
    }

    if (_validator["default"].isEmpty(password) || _validator["default"].isEmpty(email)) {
      return res.status(400).send({
        status: 'error',
        error: 'please provide email and password'
      });
    }

    _config["default"].query('SELECT * FROM users WHERE email = $1', [email], function (error, results) {
      if (!results.rows[0] || !_helper["default"].comparePassword(results.rows[0].password, password)) {
        return res.status(400).send({
          status: 'error',
          error: 'Email/password is incorrect'
        });
      }

      if (results.rows[0].is_verified == false) {
        return res.status(400).send({
          status: 'error',
          error: 'You had started the registration ' + 'process earlier. ' + 'An email has been sent to your email address. ' + 'Please check your email to complete your registration.'
        });
      }

      return next();
    });
  }
};
var _default = validateUser;
exports["default"] = _default;