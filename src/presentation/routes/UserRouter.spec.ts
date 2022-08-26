import request from 'supertest';
import app from '../../index';
import UserRepository from '@domain/user/repository/UserRepository';
import { IUser } from '@interfaces/domain/repository';
import axios from 'axios';
import {
  mCpfEqualUser,
  mCpfInvalidUser,
  mCpfRepeatedUser,
  mEmailRepeatedUser,
  mockValidUser,
  mPCodeInvalidUser,
} from './mocks/UserRouter.mock';

const spyRepository = {
  readAll: jest.spyOn(UserRepository.prototype, 'readAll'),
  create: jest.spyOn(UserRepository.prototype, 'create'),
};

const mockDatabase = new Map<number, IUser>().set(0, {
  email: mEmailRepeatedUser.email,
  cpf: mCpfRepeatedUser.cpf,
} as IUser);

beforeEach(() => {
  spyRepository.readAll.mockReset();
  spyRepository.create.mockClear();
  spyRepository.readAll.mockImplementation(() => {
    return mockDatabase;
  });
});

describe('Route /customer', () => {
  describe('GET /customer', () => {
    const expectedResults: Record<string, object | string> = {
      listJson: {
        0: { email: mEmailRepeatedUser.email, cpf: mCpfRepeatedUser.cpf },
      },
      getError: 'Error: Failed to readAll database',
    };

    it('Should return all customers when reading works correctly', async () => {
      spyRepository.readAll.mockImplementation(() => {
        return mockDatabase;
      });
      const res = await request(app).get('/customer');
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual(expectedResults.listJson);
    });

    it('Should return reading error when readAll fails', async () => {
      spyRepository.readAll.mockImplementationOnce(() => {
        throw new Error('');
      });
      const res = await request(app).get('/customer');
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual(expectedResults.getError);
    });
  });

  describe('POST /customer', () => {
    const expectedResults: Record<string, IUser | string> = {
      newUser: {
        ...mockValidUser,
        cpf: '12345678909',
        cellphone: '47991234567',
        birthdate: '2000-01-01T00:00:00.000Z',
        postal_code: '89010203',
      },
      repeatedCpf: '19087282052',
      repeatedEmail: 'repeated@repeated.com',
      equalCpf: '11111111111',
      invalidCpf: '10897799900',
      invalidPostalCode: '01010101',
    };

    const missingCases: (keyof IUser)[] = [
      'address',
      'postal_code',
      'city',
      'country',
      'whatsapp',
      'email_sms',
      'birthdate',
      'cellphone',
      'cpf',
      'email_confirmation',
      'email',
      'full_name',
    ];

    spyRepository.readAll.mockImplementation(() => {
      return mockDatabase;
    });

    it('Should respond with sanitized user json when creating valid user', async () => {
      spyRepository.create.mockImplementation(() => mockValidUser);
      const res = await request(app).post('/customer').send(mockValidUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(201);
      expect(res.body.message).toEqual(expectedResults.newUser);
    });

    it('Should respond with error when cpf already exists', async () => {
      spyRepository.create.mockImplementation(() => mCpfRepeatedUser);
      const res = await request(app).post('/customer').send(mCpfRepeatedUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: CPF ${expectedResults.repeatedCpf} already exists`,
      );
    });

    it('Should respond with error when email already exists', async () => {
      spyRepository.create.mockImplementation(() => mEmailRepeatedUser);
      const res = await request(app).post('/customer').send(mEmailRepeatedUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: Email ${expectedResults.repeatedEmail} already exists`,
      );
    });

    it('Should respond with error when user cpf is composed only with one number', async () => {
      spyRepository.create.mockImplementation(() => mCpfEqualUser);
      const res = await request(app).post('/customer').send(mCpfEqualUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: CPF ${expectedResults.equalCpf} is invalid`,
      );
    });

    it('Should respond with error when user cpf is invalid', async () => {
      spyRepository.create.mockImplementation(() => mCpfInvalidUser);
      const res = await request(app).post('/customer').send(mCpfInvalidUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: CPF ${expectedResults.invalidCpf} is invalid`,
      );
    });

    it('Should respond with error when user postal code is invalid', async () => {
      spyRepository.create.mockImplementation(() => mPCodeInvalidUser);
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
      const res = await request(app).post('/customer').send(mPCodeInvalidUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: Postal Code ${expectedResults.invalidPostalCode} is invalid`,
      );
    });

    it.each(missingCases)(
      'Should respond with error when %p is missing in new user',
      async (firstParam) => {
        jest
          .spyOn(UserRepository.prototype, 'create')
          .mockImplementation(() => mockValidUser);
        (mockValidUser[firstParam] as unknown) = undefined;
        const res = await request(app).post('/customer').send();
        expect(res).not.toBeUndefined();
        expect(res.status).toBe(422);
      },
    );
  });
});
