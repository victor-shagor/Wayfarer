import express from 'express';

import User from '../controllers/users';
import validate from '../middleware/userValidations';
import Auth from '../middleware/auth';


const userRouter = express.Router();

const { verifyInput, verifySignin } = validate;
const { create, signin, verifyEmail } = User;
const { verifyToken } = Auth;


userRouter.route('/api/v1/auth/signup').post(verifyInput, create);
userRouter.route('/api/v1/auth/signin').post(verifySignin, signin);
userRouter.route('/api/v1/auth/verifyEmail').get(verifyToken, verifyEmail);



export default userRouter;
