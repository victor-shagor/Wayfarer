import express from 'express';

import notify, {read} from '../controllers/notification';


const userRouter = express.Router();

// const { notifyUser } = notify;


userRouter.route('/api/v1/notifyUser/:id').get(notify);
userRouter.route('/api/v1/notifyUser/:id').post(read);



export default userRouter;
