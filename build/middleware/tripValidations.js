"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _moment = _interopRequireDefault(require("moment"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable camelcase */
var validateTrip = {
  verifyTrip: function verifyTrip(req, res, next) {
    var _req$body = req.body,
        bus_id = _req$body.bus_id,
        trip_date = _req$body.trip_date,
        fare = _req$body.fare,
        origin = _req$body.origin,
        destination = _req$body.destination;
    var requiredFields = ['bus_id', 'origin', 'destination', 'trip_date', 'fare'];
    var missingFields = [];
    requiredFields.forEach(function (fields) {
      if (req.body[fields] === undefined) {
        missingFields.push(fields);
      }
    });

    if (missingFields.length !== 0) {
      return res.status(400).json({
        status: 'error',
        error: 'The following field(s) is/are required',
        fields: missingFields
      });
    }

    if (!_validator["default"].isAlphanumeric(origin) || !_validator["default"].isAlphanumeric(destination)) {
      return res.status(400).json({
        status: 'error',
        error: 'origin/destination must contain alphabets or numbers'
      });
    }

    if (!_validator["default"].isISO8601(trip_date)) {
      return res.status(400).json({
        status: 'error',
        error: 'Trip_date can only be a date in YYYY-MM-DD format'
      });
    }

    if ((0, _moment["default"])(trip_date).diff((0, _moment["default"])(0, 'HH'), 'day') < 0) {
      return res.status(403).json({
        status: 'error',
        error: 'Trip_date cannot be in the past'
      });
    }

    if (!/^\d*\.?\d*$/.test(fare) || !_helper["default"].isValidNumber(bus_id) || fare < 1) {
      return res.status(400).json({
        status: 'error',
        error: 'Bus id and fare can only be a number'
      });
    }

    _config["default"].query('SELECT id FROM bus WHERE id = $1', [bus_id], function (error, results) {
      if (!results.rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: "Bus with id:".concat(bus_id, " not found")
        });
      }

      _config["default"].query('SELECT bus_id FROM trips WHERE bus_id = $1', [bus_id], function (err, result) {
        if (result.rows[0]) {
          return res.status(409).json({
            status: 'error',
            error: "Bus with id:".concat(bus_id, " already assigned to a trip")
          });
        }

        return next();
      });
    });
  },
  verifyBook: function verifyBook(req, res, next) {
    var decoded = _jsonwebtoken["default"].decode(req.headers['token'], {
      complete: true
    });

    var trip_id = req.body.trip_id;

    if (!trip_id || !_helper["default"].isValidNumber(trip_id)) {
      return res.status(400).json({
        status: 'error',
        error: 'trip_id can only be a number'
      });
    }

    _config["default"].query('SELECT id, status FROM trips WHERE id =$1', [trip_id], function (err, results) {
      if (!results.rows[0] || results.rows[0].status !== 'active') {
        return res.status(404).json({
          status: 'error',
          error: 'Trip not found/Active'
        });
      }

      _config["default"].query('SELECT * FROM bookings WHERE user_id =$1', [decoded.payload.user_id], function (error, result) {
        var test;
        result.rows.forEach(function (trips) {
          if (trips.trip_id === parseInt(trip_id)) {
            test = false;
          }
        });

        if (test === false) {
          return res.status(400).json({
            status: 'error',
            error: 'Trip already booked by you'
          });
        }

        next();
      });
    });
  },
  verifyDel: function verifyDel(req, res, next) {
    var decoded = _jsonwebtoken["default"].decode(req.headers['token'], {
      complete: true
    });

    var booking_id = req.params.booking_id;

    if (!_helper["default"].isValidNumber(booking_id)) {
      return res.status(400).json({
        status: 'error',
        error: 'id can only be a number'
      });
    }

    _config["default"].query('SELECT * FROM bookings WHERE user_id =$1 AND id =$2', [decoded.payload.user_id, booking_id], function (error, results) {
      if (!results.rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'booking not on your booking list'
        });
      }

      return next();
    });
  },
  verifyCancel: function verifyCancel(req, res, next) {
    var trip_id = req.params.trip_id;

    if (!_helper["default"].isValidNumber(trip_id)) {
      return res.status(400).json({
        status: 'error',
        error: 'id can only be a number'
      });
    }

    _config["default"].query('SELECT id, status FROM trips WHERE id =$1', [trip_id], function (error, results) {
      if (!results.rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'Trip not found'
        });
      }

      if (results.rows[0].status === 'cancelled') {
        return res.status(409).json({
          status: 'error',
          error: 'Trip already cancelled'
        });
      }

      return next();
    });
  },
  verifyFilter: function verifyFilter(req, res, next) {
    var origin = req.body.origin;
    var destination = req.body.destination;

    if (!origin && !destination) {
      return res.status(400).json({
        status: 'error',
        error: 'Either origin or destination is required to filter'
      });
    }

    if (origin && destination) {
      _config["default"].query('SELECT * FROM trips WHERE origin =$1 AND destination=$2', [origin, destination], function (error, resul) {
        if (!resul.rows[0]) {
          return res.status(400).json({
            status: 'error',
            error: "There no trips from ".concat(origin, " going to ").concat(destination)
          });
        }

        next();
      });
    }

    if (origin && !destination) {
      _config["default"].query('SELECT * FROM trips WHERE origin =$1', [origin], function (error, results) {
        if (!results.rows[0]) {
          return res.status(404).json({
            status: 'error',
            error: "There no trips from ".concat(origin)
          });
        }

        next();
      });
    }

    if (destination && !origin) {
      _config["default"].query('SELECT * FROM trips WHERE destination =$1', [destination], function (error, result) {
        if (!result.rows[0]) {
          return res.status(404).json({
            status: 'error',
            error: "There no trips going to ".concat(destination)
          });
        }

        next();
      });
    }
  },
  verifySeat: function verifySeat(req, res, next) {
    var decoded = _jsonwebtoken["default"].decode(req.headers['token'], {
      complete: true
    });

    var seat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var _req$body2 = req.body,
        trip_id = _req$body2.trip_id,
        seat_number = _req$body2.seat_number;

    if (!trip_id || !_helper["default"].isValidNumber(trip_id)) {
      return res.status(400).json({
        status: 'error',
        error: 'trip_id can only be a number'
      });
    }

    if (!seat_number || seat_number > 20 || !_helper["default"].isValidNumber(seat_number)) {
      return res.status(400).json({
        status: 'error',
        error: 'seat_number can only be a number and cannot be more than 20'
      });
    }

    _config["default"].query('SELECT id, status FROM trips WHERE id =$1', [trip_id], function (err, results) {
      if (!results.rows[0] || results.rows[0].status !== 'active') {
        return res.status(404).json({
          status: 'error',
          error: 'Trip not found/Active'
        });
      }

      _config["default"].query('SELECT * FROM bookings WHERE user_id =$1', [decoded.payload.user_id], function (error, result) {
        var test;
        result.rows.forEach(function (trips) {
          if (trips.trip_id === parseInt(trip_id)) {
            test = false;
          }
        });

        if (test === false) {
          return res.status(400).json({
            status: 'error',
            error: 'Trip already booked by you'
          });
        }

        _config["default"].query('SELECT seat_number FROM bookings where trip_id =$1', [trip_id], function (errr, resul) {
          var testing;
          resul.rows.forEach(function (seats) {
            for (var i = 0; i < seat.length; i++) {
              if (seat[i] === seats.seat_number) {
                seat.splice(i, 1);
              }
            }

            if (parseInt(seat_number) === seats.seat_number) {
              testing = false;
            }
          });

          if (testing === false) {
            return res.status(409).json({
              status: 'error',
              error: "Seat taken, seats available are ".concat(seat)
            });
          }

          next();
        });
      });
    });
  }
};
var _default = validateTrip;
exports["default"] = _default;