import { Router } from 'express';

const userRouter = Router();

userRouter.get('/');
userRouter.get('/:id');
userRouter.post('/');
userRouter.put('/');
userRouter.delete('/');

export { userRouter };
