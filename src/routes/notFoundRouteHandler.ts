import { Request, Response, NextFunction } from 'express';

export function notFoundRouteHandler(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  return res.status(404).json({
    status: 'fail',
    message: 'Route not found!',
  });
}
