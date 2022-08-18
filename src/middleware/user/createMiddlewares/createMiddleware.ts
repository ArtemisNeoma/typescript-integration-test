import { RouteMiddleware } from '@interfaces/middleware';
import StatusError from '@util/error';
import { NextFunction, Request, Response } from 'express';
import userSchema from './schema';

export const createMiddleware: RouteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateBody = await userSchema.validateAsync(req.body);
    req.body = validateBody;
    next();
  } catch (error) {
    next(new StatusError(422, `${error}`));
  }
};
