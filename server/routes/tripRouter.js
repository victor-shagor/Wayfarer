import express from 'express';

import trip from '../controllers/trips';
import validate from '../middleware/validations';
import Auth from '../middleware/auth';


const tripRouter = express.Router();

const { verifyTrip, verifyGet } = validate;
const {create, getTrips } = trip;
const { verifyAdmin, verifyToken } = Auth;


tripRouter.route('/api/v1/trips').post(verifyAdmin, verifyTrip, create);
tripRouter.route('/api/v1/trips').get(verifyToken, verifyGet, getTrips);


export default tripRouter;