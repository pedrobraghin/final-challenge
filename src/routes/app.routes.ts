import { Router } from 'express';
import { userRouter } from './user.routes';
import UsersController from '../modules/user/UsersController';

const appRouter = Router();

appRouter.post('/authenticate', UsersController.authenticateUser);
appRouter.use('/user', userRouter);

export { appRouter };
