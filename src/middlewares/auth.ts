import { GetUserByIdService } from './../modules/user/GetUserByIdService';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../error/UnauthorizedError';
import { JWTHandler } from '../jwt/JWTHandler';
import { UsersRepository } from '../modules/user/UsersRepository';

export async function auth(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new UnauthorizedError('Token is missing!'));
    }

    const isValidToken = JWTHandler.validateToken(token);

    if (!isValidToken) {
      return next(new UnauthorizedError('Invalid or expired token!'));
    }

    const userId = isValidToken.id;

    const getUserByIdService = new GetUserByIdService(UsersRepository);
    const user = await getUserByIdService.execute(userId);

    req.app.locals.user = user;
    next();
  } catch (err) {
    return next(new UnauthorizedError('Invalid or expired token!'));
  }
}
