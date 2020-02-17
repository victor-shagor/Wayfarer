"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable consistent-return */
var Auth = {
  verifyToken: function verifyToken(req, res, next) {
    var token = req.headers['token'] || req.query.token;

    if (!token) {
      return res.status(401).send({
        status: 401,
        error: 'Access Denied, Token is not provided'
      });
    }

    _jsonwebtoken["default"].verify(token, process.env.SECRET, function (error) {
      if (error) {
        return res.status(400).send({
          status: 400,
          error: 'Access Denied, The Token provided is invalid'
        });
      }

      return next();
    });
  },
  verifyAdmin: function verifyAdmin(req, res, next) {
    var token = req.headers['token'] || req.query.token;

    if (!token) {
      return res.status(401).send({
        status: 401,
        error: 'Access Denied, Token is not provided'
      });
    }

    _jsonwebtoken["default"].verify(token, process.env.SECRET, function (error, decoded) {
      if (error) {
        return res.status(400).send({
          status: 400,
          error: 'Access Denied, The Token provided is invalid'
        });
      }

      if (decoded.is_admin !== true) {
        return res.status(403).send({
          status: 403,
          error: 'Only Admin can access this route'
        });
      }

      return next();
    });
  }
};
var _default = Auth;
exports["default"] = _default;