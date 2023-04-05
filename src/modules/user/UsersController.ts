import { Request, Response, NextFunction } from 'express';
import { UsersRepository } from './UsersRepository';
import { InputUserDTO } from '../../interfaces/InputUserDTO';
import { CreateUserService } from './CreateUserService';

export class UsersController {
  async createUser(req: Request, res: Response, _next: NextFunction) {
    const createUserService = new CreateUserService(UsersRepository);
    const input: InputUserDTO = req.body;
    const user = await createUserService.execute(input);

    return res.status(201).json({
      status: 'success',
      data: user,
    });
  }
}

export default new UsersController();
