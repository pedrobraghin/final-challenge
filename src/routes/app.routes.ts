import { Router } from 'express';
import { userRouter } from './user.routes';
import { carRouter } from './car.routes';
import { reservationRouter } from './reservation.routes';

import UsersController from '../modules/user/UsersController';

const appRouter = Router();

appRouter.post('/authenticate', UsersController.authenticateUser);
appRouter.use('/user', userRouter);
appRouter.use('/car', carRouter);
appRouter.use('/reserve', reservationRouter);

export { appRouter };
