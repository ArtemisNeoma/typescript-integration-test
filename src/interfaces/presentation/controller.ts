import { NextFunction, Request, Response } from 'express';

export type RouteBase = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response | undefined> | Response | undefined;

export interface IEndPointsController {
  handle: RouteBase;
}
