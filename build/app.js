"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

var _cors = _interopRequireDefault(require("cors"));

var _userRouter = _interopRequireDefault(require("./routes/userRouter"));

var _tripRouter = _interopRequireDefault(require("./routes/tripRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());

var swaggerDoc = _yamljs["default"].load('./swagger.yaml');

app.use('/api/v1/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerDoc));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use('/', _userRouter["default"]);
app.use('/', _tripRouter["default"]);
app.get('/', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to bus-connect'
  });
});
app.use('*', function (req, res) {
  return res.status(404).send({
    message: 'route not found'
  });
});
var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("Listening from port ".concat(port));
});
var _default = app;
exports["default"] = _default;