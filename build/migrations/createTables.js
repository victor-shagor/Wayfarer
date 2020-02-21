"use strict";

require("@babel/polyfill");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createTables = "\n  CREATE TABLE IF NOT EXISTS users (\n   user_id SERIAL PRIMARY KEY,\n   email VARCHAR,\n   first_name VARCHAR(20),\n   last_name VARCHAR(20),\n   password VARCHAR,\n   is_verified BOOLEAN,\n   is_admin BOOLEAN\n  );\n  CREATE TABLE IF NOT EXISTS bus (\n   ID SERIAL PRIMARY KEY,\n   number_plate VARCHAR,\n   manufacturer VARCHAR,\n   model VARCHAR,\n   year INT,\n   capacity INT\n  );\n  CREATE TABLE IF NOT EXISTS trips (\n   id SERIAL PRIMARY KEY,\n   bus_id INT,\n   origin VARCHAR,\n   destination VARCHAR,\n   trip_date DATE,\n   fare FLOAT,\n   status VARCHAR\n  );\n  CREATE TABLE IF NOT EXISTS bookings (\n   id SERIAL PRIMARY KEY,\n   trip_id INT,\n   user_id INT,\n   bus_id INT,\n   trip_date DATE,\n   seat_number INT,\n   first_name VARCHAR,\n   origin VARCHAR,\n   destination VARCHAR,\n   last_name VARCHAR,\n   email VARCHAR,\n   status VARCHAR,\n   created_on TIMESTAMP\n  );\n";

var createDatabaseTables =
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
            return _config["default"].query(createTables).then(function () {
              console.log('Tables successfully created');
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createDatabaseTables() {
    return _ref.apply(this, arguments);
  };
}();

createDatabaseTables();