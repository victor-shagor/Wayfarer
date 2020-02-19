import express from 'express';

import trip from '../controllers/trips';
import validate from '../middleware/tripValidations';
import Auth from '../middleware/auth';


const tripRouter = express.Router();

const { verifyTrip, verifyBook, verifyDel, verifyCancel, verifyFilter, verifySeat } = validate;
const {create, getTrips, book, getBookings, deleteBookings, cancelTrip, getFilterTrips, changeSeat } = trip;
const { verifyAdmin, verifyToken } = Auth;


tripRouter.route('/api/v1/trips').post(verifyAdmin, verifyTrip, create);
tripRouter.route('/api/v1/trips').get(verifyToken, getTrips);
tripRouter.route('/api/v1/bookings').post(verifyToken, verifyBook, book);
tripRouter.route('/api/v1/bookings').get(verifyToken, getBookings);
tripRouter.route('/api/v1/bookings/:booking_id').delete(verifyToken, verifyDel, deleteBookings);
tripRouter.route('/api/v1/trips/:trip_id').patch(verifyAdmin, verifyCancel, cancelTrip);
tripRouter.route('/api/v1/trips/filter').post(verifyToken, verifyFilter, getFilterTrips);
tripRouter.route('/api/v1/bookings/seat').post(verifyToken, verifySeat, changeSeat);


export default tripRouter;