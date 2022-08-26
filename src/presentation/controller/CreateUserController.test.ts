import container from '@di/index';
import { NextFunction, Request, Response } from 'express';
import CreateUserController from './CreateUserController';
import CreateUserService from '@domain/user/services/CreateUserService';
import StatusError from '@util/error';
import { IUser } from '@interfaces/domain/user/repository';

const userMock: IUser = {} as IUser;
const req = {} as Request;
const res = {} as Response;
const next = jest.fn() as NextFunction;
const spyCreateUserController = jest.spyOn(
  CreateUserService.prototype,
  'create',
);

beforeAll(() => {
  req.body = userMock;
  res.status = jest.fn();
  res.json = jest.fn();
});

describe('CreateUserController', () => {
  describe('handle', () => {
    const createUserController = container.resolve(CreateUserController);
    it('Should create user when all fields are correct', async () => {
      spyCreateUserController.mockResolvedValue(userMock);
      await createUserController.handle(req, res, next);
      expect(res.status).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it('Should run next with error when user is incorrect', async () => {
      const error = new Error();
      spyCreateUserController.mockRejectedValue(error);
      await createUserController.handle(req, res, next);
      expect(next).toBeCalled();
      expect(next).toHaveBeenCalledWith(new StatusError(422, `${error}`));
    });
  });
});
