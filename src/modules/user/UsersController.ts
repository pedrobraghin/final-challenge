import { DeleteUserByIdService } from './DeleteUserByIdService';
import { GetAllUsersService } from './GetAllUsersService';
import { Request, Response, NextFunction } from 'express';
import { UsersRepository } from './UsersRepository';
import { InputUserDTO } from '../../interfaces/InputUserDTO';
import { CreateUserService } from './CreateUserService';
import { GetUserByIdService } from './GetUserByIdService';
import { CatchExpressError } from '../../decorators/CatchExpressError';
import { AuthenticateUserService } from './AuthenticateUserService';
import { UpdateUserService } from './UpdateUserService';
import { PaginationUtils } from '../../utils/PaginationUtils';

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

    const offsets = PaginationUtils.calculateOffets(
      limit,
      documents.documentsCount
    );

    return res.status(200).json({
      status: 'success',
      results: documents.users.length,
      limit: limit || documents.documentsCount,
      offset,
      offsets,
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

  @CatchExpressError
  async authenticateUser(req: Request, res: Response, _next: NextFunction) {
    const { email, password } = req.body;
    const authenticateUserService = new AuthenticateUserService(
      UsersRepository
    );
    const token = await authenticateUserService.execute(email, password);

    res.set('Authorization', `Bearer ${token}`);

    return res.status(200).send();
  }

  @CatchExpressError
  async updateUser(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    const input: Partial<InputUserDTO> = req.body;
    const updateUserService = new UpdateUserService(UsersRepository);
    const updatedUser = await updateUserService.execute(id, input);

    return res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  }
}

export default new UsersController();
