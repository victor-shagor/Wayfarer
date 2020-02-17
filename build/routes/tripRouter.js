"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _trips = _interopRequireDefault(require("../controllers/trips"));

var _tripValidations = _interopRequireDefault(require("../middleware/tripValidations"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tripRouter = _express["default"].Router();

var verifyTrip = _tripValidations["default"].verifyTrip,
    verifyBook = _tripValidations["default"].verifyBook,
    verifyDel = _tripValidations["default"].verifyDel,
    verifyCancel = _tripValidations["default"].verifyCancel,
    verifyFilter = _tripValidations["default"].verifyFilter,
    verifySeat = _tripValidations["default"].verifySeat;
var create = _trips["default"].create,
    getTrips = _trips["default"].getTrips,
    book = _trips["default"].book,
    getBookings = _trips["default"].getBookings,
    deleteBookings = _trips["default"].deleteBookings,
    cancelTrip = _trips["default"].cancelTrip,
    getFilterTrips = _trips["default"].getFilterTrips,
    changeSeat = _trips["default"].changeSeat;
var verifyAdmin = _auth["default"].verifyAdmin,
    verifyToken = _auth["default"].verifyToken;
tripRouter.route('/api/v1/trips').post(verifyAdmin, verifyTrip, create);
tripRouter.route('/api/v1/trips').get(verifyToken, getTrips);
tripRouter.route('/api/v1/bookings').post(verifyToken, verifyBook, book);
tripRouter.route('/api/v1/bookings').get(verifyToken, getBookings);
tripRouter.route('/api/v1/bookings/:booking_id')["delete"](verifyToken, verifyDel, deleteBookings);
tripRouter.route('/api/v1/trips/:trip_id').patch(verifyAdmin, verifyCancel, cancelTrip);
tripRouter.route('/api/v1/trips/filter').get(verifyToken, verifyFilter, getFilterTrips);
tripRouter.route('/api/v1/bookings/seat').post(verifyToken, verifySeat, changeSeat);
var _default = tripRouter;
exports["default"] = _default;