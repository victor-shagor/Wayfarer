"use strict";

require("@babel/polyfill");

var _config = _interopRequireDefault(require("../config"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var password = _helper["default"].hashPassword('oladimeji1');

var password1 = _helper["default"].hashPassword('adedoyin1');

var populate = "\nINSERT INTO users (first_name, last_name, email, password, is_admin, is_verified) VALUES ('abiola','victor','ojoabiola@gmail.com','".concat(password, "',true, true);\nINSERT INTO users (first_name, last_name, email, password, is_admin, is_verified) VALUES ('doyin','adedokun','doyin@gmail.com','").concat(password1, "',false, true);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380A','Honda','DL360', 2016, 20);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380B','Honda','DL360', 2016, 20);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380C','Honda','DL360', 2016, 20);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380D','Honda','DL360', 2016, 20);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380E','Honda','DL360', 2016, 20);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380A','Honda','DL360', 2016, 20);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380B','Honda','DL360', 2016, 20);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380C','Honda','DL360', 2016, 20);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380D','Honda','DL360', 2016, 20);\nINSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380E','Honda','DL360', 2016, 20);\nINSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (1,'lagos','abuja', '07/12/2020', 5000, 'active');\nINSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (2,'lagos','abuja', '07/12/2020', 5000, 'active');\nINSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (3,'abuja','kaduna', '07/12/2020', 5000, 'active');\nINSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (4,'abuja','lagos', '07/12/2020', 5000, 'active');\nINSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (5,'kaduna','ibadan', '07/12/2020', 5000, 'active');\n");

var seedDatabase =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _config["default"].query(populate).then(function () {
              console.log('tables Successfully populated');
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function seedDatabase() {
    return _ref.apply(this, arguments);
  };
}();

seedDatabase();