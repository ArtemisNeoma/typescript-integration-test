import container from '@di/index';
import { IUser } from '@interfaces/domain/user/repository';
import UserRepository from '../repository/UserRepository';
import CreateUserService from './CreateUserService';
import UserValidator from './helpers/UserValidator';

const newUser: IUser = {} as IUser;
describe('CreateUserService', () => {
  describe('create', () => {
    const createUserService = container.resolve(CreateUserService);
    const spyRepository = jest
      .spyOn(UserRepository.prototype, 'create')
      .mockReturnValue(newUser);
    const spyValidator = jest
      .spyOn(UserValidator.prototype, 'validate')
      .mockResolvedValue();
    it('Should resolve new user when input data is correct', async () => {
      expect(await createUserService.create(newUser)).toEqual(newUser);
    });
    it('Should reject with error when validation fails', async () => {
      spyValidator.mockImplementationOnce(() => Promise.reject(new Error()));
      await expect(createUserService.create(newUser)).rejects.toEqual(
        new Error(),
      );
    });
    it('Should reject with error when repository fails', async () => {
      spyRepository.mockImplementation(() => {
        throw new Error();
      });
      await expect(createUserService.create(newUser)).rejects.toEqual(
        new Error(),
      );
    });
  });
});
