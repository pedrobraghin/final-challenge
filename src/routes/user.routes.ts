import { Router } from 'express';
import UsersController from '../modules/user/UsersController';
const userRouter = Router();

userRouter.get('/');
userRouter.get('/:id');
userRouter.post('/', UsersController.createUser);
userRouter.put('/');
userRouter.delete('/');

export { userRouter };
