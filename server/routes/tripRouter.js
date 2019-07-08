import express from 'express';

import trip from '../controllers/trips';
import validate from '../middleware/validations';
import Auth from '../middleware/auth';


const tripRouter = express.Router();

const { verifyTrip } = validate;
const {create } = trip;
const { verifyAdmin } = Auth;


tripRouter.route('/api/v1/trips').post(verifyAdmin, verifyTrip, create);

export default tripRouter;