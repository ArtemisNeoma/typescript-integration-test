import { IUser } from '@interfaces/domain/user/repository';

export const mockValidUser: IUser = {
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
  postal_code: '89010-203',
  address: 'Rua X, 001, Itoupava',
};

export const mCpfRepeatedUser: IUser = {
  ...mockValidUser,
  cpf: '19087282052',
};

export const mEmailRepeatedUser: IUser = {
  ...mockValidUser,
  email: 'repeated@repeated.com',
  email_confirmation: 'repeated@repeated.com',
};

export const mCpfEqualUser: IUser = {
  ...mockValidUser,
  email: 'equal@equal.com',
  email_confirmation: 'equal@equal.com',
  cpf: '11111111111',
};

export const mCpfInvalidUser: IUser = {
  ...mockValidUser,
  cpf: '10897799900',
};

export const mPCodeInvalidUser: IUser = {
  ...mockValidUser,
  postal_code: '01010101',
};

export const mockDatabase = new Map<number, IUser>().set(0, {
  email: mEmailRepeatedUser.email,
  cpf: mCpfRepeatedUser.cpf,
} as IUser);
