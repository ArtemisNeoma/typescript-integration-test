import { IStatusError } from '@interfaces/util/error';
import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (
  err: IStatusError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.code).json({ error: err.message });
};
