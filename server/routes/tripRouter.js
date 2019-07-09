import express from 'express';

import trip from '../controllers/trips';
import validate from '../middleware/validations';
import Auth from '../middleware/auth';


const tripRouter = express.Router();

const { verifyTrip, verifyGet, verifyBook, verifyDel } = validate;
const {create, getTrips, book, getBookings, deleteBookings } = trip;
const { verifyAdmin, verifyToken } = Auth;


tripRouter.route('/api/v1/trips').post(verifyAdmin, verifyTrip, create);
tripRouter.route('/api/v1/trips').get(verifyToken, verifyGet, getTrips);
tripRouter.route('/api/v1/bookings').post(verifyToken, verifyBook, book);
tripRouter.route('/api/v1/bookings').get(verifyToken, getBookings);
tripRouter.route('/api/v1/bookings/:bookingId').delete(verifyToken, verifyDel, deleteBookings);


export default tripRouter;