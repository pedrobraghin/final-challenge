import { MongoError } from 'mongodb';
import { ValidationError } from '../error/ValidationError';
import { Request, Response, NextFunction } from 'express';
import { MongoErrors } from '../utils/MongoErrors';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof MongoError) {
    const error = MongoErrors.resolveMongoError(err);
    return res.status(error.statusCode).json({
      status: 'fail',
      message: error.message,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      errors: err.errors,
    });
  }

  return res.status(500).json({
    status: 'fail',
    message: 'Internal server error. Please try again later.',
  });
}
