import { MiddlewareArray } from '@interfaces/middleware';
import { createMiddleware } from './createMiddleware';

const createUserMiddlewares: MiddlewareArray = [createMiddleware];
export default createUserMiddlewares;
