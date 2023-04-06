import { DeleteUserByIdService } from './DeleteUserByIdService';
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

  @CatchExpressError
  async getAllUsers(req: Request, res: Response, _next: NextFunction) {
    const limit = Number(req.query.limit) || 0;
    const offset = Number(req.query.offset) || 0;

    const getAllUsersService = new GetAllUsersService(UsersRepository);
    const documents = await getAllUsersService.execute(limit, offset);

    const offsets = (limit && Math.ceil(documents.documentsCount / limit)) || 0;

    return res.status(200).json({
      status: 'success',
      results: documents.users.length,
      limit: limit || documents.documentsCount,
      offset: offset,
      offsets: offsets,
      data: documents.users,
    });
  }

  @CatchExpressError
  async getUserById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const getUserByIdService = new GetUserByIdService(UsersRepository);
    const user = await getUserByIdService.execute(id);

    return res.status(200).json({
      statusbar: 'success',
      data: user,
    });
  }

  @CatchExpressError
  async deleteUserById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const deleteUserByIdService = new DeleteUserByIdService(UsersRepository);

    await deleteUserByIdService.execute(id);

    return res.status(204).json({});
  }
}

export default new UsersController();
