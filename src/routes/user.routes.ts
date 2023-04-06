import { Router } from 'express';
import UsersController from '../modules/user/UsersController';
const userRouter = Router();

userRouter.get('/', UsersController.getAllUsers);
userRouter.get('/:id', UsersController.getUserById);
userRouter.post('/', UsersController.createUser);
userRouter.put('/');
userRouter.delete('/:id', UsersController.deleteUserById);

export { userRouter };
