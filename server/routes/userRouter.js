import express from 'express';

import User from '../controllers/users';
import validate from '../middleware/validations';


const userRouter = express.Router();

const { verifyInput } = validate;
const { create } = User;


userRouter.route('/api/v1/auth/signup').post(verifyInput, create);


export default userRouter;
