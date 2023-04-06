import { MongoError } from 'mongodb';
import { Request, Response, NextFunction } from 'express';
import { MongoUtils } from '../utils/MongoUtils';
import { BaseError } from '../error/BaseError';
import { ValidationError } from '../error/ValidationError';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof MongoError) {
    const error = MongoUtils.resolveMongoError(err);
    return res.status(error.statusCode).json({
      status: 'fail',
      message: error.message,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
      errors: err.errors,
    });
  }

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'fail',
    message: 'Internal server error. Please try again later.',
  });
}
