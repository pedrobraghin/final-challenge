import { Router } from 'express';
import UsersController from '../modules/user/UsersController';
import { auth } from '../middlewares/auth';
const userRouter = Router();

userRouter.post('/', UsersController.createUser);

userRouter.use(auth);
userRouter.get('/', UsersController.getAllUsers);
userRouter.get('/:id', UsersController.getUserById);
userRouter.put('/:id', UsersController.updateUser);
userRouter.delete('/:id', UsersController.deleteUserById);

export { userRouter };
