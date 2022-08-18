import UserRepository from '@domain/user/repository/UserRepository';
import CreateUserService from '@domain/user/services/CreateUserService';
import checkUnique from '@domain/user/services/helpers/checkUnique';
import getCep from 'services/cep/getCep';
import UserValidator from '@domain/user/services/helpers/UserValidator';
import ListUserService from '@domain/user/services/ListUserService';
import { IRepositoryUser } from '@interfaces/domain/repository';
import {
  ICreateUserService,
  IListUserService,
} from '@interfaces/domain/services/service';
import { IUserValidator } from '@interfaces/domain/services/validation';
import { ControllerAdapterType, MiddlewareArray } from '@interfaces/middleware';
import { IEndPointsController } from '@interfaces/presentation/controller';
import controllerAdapter from '@middleware/controllerAdapter';
import createUserMiddlewares from '@middleware/user/createMiddlewares';
import isCpfValid from '@util/validation/Cpf/isCpfValid';
import { Router } from 'express';
import CreateUserController from '@presentation/controller/CreateUserController';
import ListUserController from '@presentation/controller/ListUserController';
import { container } from 'tsyringe';

container.register<Router>('FrameworkRouter', { useValue: Router() });
container.registerSingleton<IEndPointsController>(
  'CreateUserController',
  CreateUserController,
);
container.registerSingleton<IEndPointsController>(
  'ListUserController',
  ListUserController,
);
container.register<MiddlewareArray>('CreateUserMiddlewares', {
  useValue: createUserMiddlewares,
});
container.register<ControllerAdapterType>('ControllerAdapter', {
  useValue: controllerAdapter,
});

container.register<ICreateUserService>('CreateUserService', CreateUserService);
container.register<IListUserService>('ListUserService', ListUserService);

container.registerSingleton<IRepositoryUser>('UserRepository', UserRepository);
container.registerSingleton<IUserValidator>('UserValidator', UserValidator);

container.register('getCep', {
  useValue: getCep,
});
container.register('isCpfValid', {
  useValue: isCpfValid,
});
container.register('checkUnique', {
  useValue: checkUnique,
});

export default container;
