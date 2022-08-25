import request from 'supertest';
import app from '../../index';
import UserRepository from '@domain/user/repository/UserRepository';
import { IUser } from '@interfaces/domain/repository';
import axios from 'axios';

const spyRepository = {
  readAll: jest.spyOn(UserRepository.prototype, 'readAll'),
  create: jest.spyOn(UserRepository.prototype, 'create'),
};

const expectedGetError = 'Error: Failed to readAll database';

const mockUser: IUser = {
  full_name: 'Teste do Teste',
  email: 'test@test.com',
  email_confirmation: 'test@test.com',
  cpf: '123.456.789-09',
  cellphone: '(47) 991234567',
  birthdate: '2000-01-01',
  email_sms: false,
  whatsapp: false,
  country: 'Brazil',
  city: 'Blumenau',
  postal_code: '89030-112',
  address: 'Rua X, 001, Itoupava',
};
const expectedUser: IUser = {
  ...mockUser,
  cpf: '12345678909',
  cellphone: '47991234567',
  birthdate: '2000-01-01T00:00:00.000Z',
  postal_code: '89030112',
};

const expectedDatabase = {
  0: { email: expectedUser.email, cpf: expectedUser.cpf },
};
const mockDatabase = new Map<number, IUser>().set(0, {
  email: expectedUser.email,
  cpf: expectedUser.cpf,
} as IUser);

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

beforeEach(() => {
  spyRepository.readAll.mockReset();
  spyRepository.create.mockClear();
  mockDatabase.clear();
  spyRepository.readAll.mockImplementation(() => {
    return mockDatabase;
  });
});

describe('Route /customer', () => {
  describe('GET /customer', () => {
    it('Should return all customers when reading works correctly', async () => {
      mockDatabase.set(0, {
        email: expectedUser.email,
        cpf: '12345678909',
      } as IUser);
      spyRepository.readAll.mockImplementation(() => {
        return mockDatabase;
      });
      const res = await request(app).get('/customer');
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual(expectedDatabase);
    });

    it('Should return reading error when readAll fails', async () => {
      spyRepository.readAll.mockImplementationOnce(() => {
        throw new Error('');
      });
      const res = await request(app).get('/customer');
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual(expectedGetError);
    });
  });

  describe('POST /customer', () => {
    it('Should respond with sanitized user json when creating valid user', async () => {
      spyRepository.create.mockImplementation(() => mockUser);
      const res = await request(app).post('/customer').send(mockUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(201);
      expect(res.body.message).toEqual(expectedUser);
    });

    it('Should respond with error when cpf already exists', async () => {
      mockDatabase.set(0, {
        cpf: expectedUser.cpf,
      } as IUser);
      spyRepository.readAll.mockImplementation(() => {
        return mockDatabase;
      });
      spyRepository.create.mockImplementation(() => mockUser);
      const res = await request(app).post('/customer').send(mockUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: CPF ${expectedUser.cpf} already exists`,
      );
    });

    it('Should respond with error when email already exists', async () => {
      mockDatabase.set(0, {
        email: expectedUser.email,
      } as IUser);
      spyRepository.readAll.mockImplementation(() => {
        return mockDatabase;
      });
      spyRepository.create.mockImplementation(() => mockUser);
      const res = await request(app).post('/customer').send(mockUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: Email ${expectedUser.email} already exists`,
      );
    });

    it('Should respond with error when user cpf is composed only with one number', async () => {
      mockUser.cpf = '55555555555';
      spyRepository.create.mockImplementation(() => mockUser);
      const res = await request(app).post('/customer').send(mockUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(`Error: CPF ${mockUser.cpf} is invalid`);
    });

    it('Should respond with error when user cpf is invalid', async () => {
      mockUser.cpf = '55555555551';
      spyRepository.create.mockImplementation(() => mockUser);
      const res = await request(app).post('/customer').send(mockUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(`Error: CPF ${mockUser.cpf} is invalid`);
    });

    it('Should respond with error when user postal code is invalid', async () => {
      spyRepository.create.mockImplementation(() => mockUser);
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
      const res = await request(app).post('/customer').send(mockUser);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: Postal Code ${expectedUser.postal_code} is invalid`,
      );
    });

    it.each(missingCases)(
      'Should respond with error when %p is missing in new user',
      async (firstParam) => {
        jest
          .spyOn(UserRepository.prototype, 'create')
          .mockImplementation(() => mockUser);
        (mockUser[firstParam] as unknown) = undefined;
        const res = await request(app).post('/customer').send();
        expect(res).not.toBeUndefined();
        expect(res.status).toBe(422);
      },
    );
  });
});
