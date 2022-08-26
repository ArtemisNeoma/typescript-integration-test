import { IUser } from '@interfaces/domain/user/repository';
import StatusError from '@util/error';
import { Request, Response } from 'express';
import { createMiddleware } from './createMiddleware';
import userCreateSchema from './schema';

const req = {} as Request;
const res = {} as Response;
const next = jest.fn();
const spyValidateAsync = jest.spyOn(userCreateSchema, 'validateAsync');

describe('createMiddleware', () => {
  it("Should run next without parameters when validation doesn't throw", async () => {
    spyValidateAsync.mockResolvedValue({} as IUser);
    await createMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  it('Should run next with throwed Error when validation fails', async () => {
    const validationError = new Error();
    spyValidateAsync.mockRejectedValue(validationError);
    await createMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new StatusError(422, `${validationError}`),
    );
  });
});
