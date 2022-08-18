import container from '@di/index';
import { NextFunction, Request, Response } from 'express';
import StatusError from '@util/error';
import ListUserService from '@domain/user/services/ListUserService';
import ListUserController from './ListUserController';
import { IDatabaseObject } from '@interfaces/domain/services/service';

const databaseMock = {} as IDatabaseObject;
const req = {} as Request;
const res = {} as Response;
const next = jest.fn() as NextFunction;
const error = new Error();
const spyListUserService = jest.spyOn(ListUserService.prototype, 'readAll');

beforeAll(() => {
  req.body = databaseMock;
  res.status = jest.fn().mockImplementation(() => res);
  res.json = jest.fn().mockImplementation(() => res);
});

describe('ListUserController', () => {
  describe('handle', () => {
    const listUserController = container.resolve(ListUserController);
    it('Should send users json with status code 200 when services succeds', () => {
      spyListUserService.mockReturnValue(databaseMock);
      listUserController.handle(req, res, next);
      expect(res.json).toBeCalledWith({ message: databaseMock });
      expect(res.status).toBeCalledWith(200);
    });
    it('Should run next with error when service fails', async () => {
      spyListUserService.mockImplementation(() => {
        throw error;
      });
      listUserController.handle(req, res, next);
      expect(next).toHaveBeenCalledWith(new StatusError(500, `${error}`));
    });
  });
});
