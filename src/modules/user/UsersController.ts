import { GetAllUsersService } from './GetAllUsersService';
import { Request, Response, NextFunction } from 'express';
import { UsersRepository } from './UsersRepository';
import { InputUserDTO } from '../../interfaces/InputUserDTO';
import { CreateUserService } from './CreateUserService';
import { GetUserByIdService } from './GetUserByIdService';
import { CatchExpressError } from '../../decorators/CatchExpressError';

export class UsersController {
  @CatchExpressError
  async createUser(req: Request, res: Response, _next: NextFunction) {
    const createUserService = new CreateUserService(UsersRepository);
    const input: InputUserDTO = req.body;
    const user = await createUserService.execute(input);

    return res.status(201).json({
      status: 'success',
      data: user,
    });
  }

  async getAllUsers(req: Request, res: Response, _next: NextFunction) {
    const getAllUsersService = new GetAllUsersService(UsersRepository);
    const users = await getAllUsersService.execute();

    return res.status(200).json({
      status: 'success',
      results: users.length,
      data: users,
    });
  }

  async getUserById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const getUserByIdService = new GetUserByIdService(UsersRepository);
    const user = await getUserByIdService.execute(id);

    return res.status(200).json({
      statusbar: 'success',
      data: user,
    });
  }
}

export default new UsersController();
