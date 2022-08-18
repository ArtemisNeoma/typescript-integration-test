import { MiddlewareArray } from '@interfaces/middleware';
import { Router } from 'express';
import { IEndPointsController } from './controller';

export interface IEndPointsRouter {
  routes(): void;
}
