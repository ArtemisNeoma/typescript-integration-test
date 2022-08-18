import { NextFunction, Request, Response } from 'express';
import { IEndPointsController } from './presentation/controller';

export interface ISchema<Target> {
  validateAsync(value: Target, ...args: any[]): Promise<Target>;
}
export interface IContextFieldOptions {
  min?: string | number | Date;
  max?: string | number | Date;
}
export interface IServiceContext {
  [index: string]: IContextFieldOptions;
}

export type RouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export type MiddlewareArray = Array<RouteMiddleware>;

export type ControllerAdapterType = (
  controller: IEndPointsController,
) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => Response | undefined | Promise<Response | undefined>;
