"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _userValidations = _interopRequireDefault(require("../middleware/userValidations"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

var verifyInput = _userValidations["default"].verifyInput,
    verifySignin = _userValidations["default"].verifySignin;
var create = _users["default"].create,
    signin = _users["default"].signin,
    verifyEmail = _users["default"].verifyEmail;
var verifyToken = _auth["default"].verifyToken;
userRouter.route('/api/v1/auth/signup').post(verifyInput, create);
userRouter.route('/api/v1/auth/signin').post(verifySignin, signin);
userRouter.route('/api/v1/auth/verifyEmail').get(verifyToken, verifyEmail);
var _default = userRouter;
exports["default"] = _default;