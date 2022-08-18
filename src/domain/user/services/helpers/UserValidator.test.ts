import UserValidator from './UserValidator';
import container from '@di/index';
import { IUser } from '@interfaces/domain/repository';

const userValidator = container.resolve(UserValidator);
const mockMethods = {
  checkUnique: jest.spyOn(userValidator, '_checkUnique').mockReturnValue(true),
  getCep: jest.spyOn(userValidator, '_getCep').mockResolvedValue(true),
  isCpfValid: jest.spyOn(userValidator, '_isCpfValid').mockReturnValue(true),
};
const mockDatabase = new Map<number, IUser>();

describe('UserValidator', () => {
  describe('validate', () => {
    it('Should not throw error when all validations return true', async () => {
      await expect(
        userValidator.validate({} as IUser, mockDatabase),
      ).resolves.not.toThrow();
    });
    it('Should reject when getCep returns false', async () => {
      mockMethods.getCep.mockResolvedValueOnce(false);
      await expect(
        userValidator.validate({} as IUser, mockDatabase),
      ).rejects.toThrow();
    });
    it('Should reject when isCpfValid returns false', async () => {
      mockMethods.isCpfValid.mockReturnValueOnce(false);
      await expect(
        userValidator.validate({} as IUser, mockDatabase),
      ).rejects.toThrow();
    });
    it('Should reject when the first checkUnique returns false', async () => {
      mockMethods.checkUnique.mockReturnValueOnce(false);
      await expect(
        userValidator.validate({} as IUser, mockDatabase),
      ).rejects.toThrow();
    });
    it('Should reject when the second checkUnique returns false', async () => {
      mockMethods.checkUnique.mockReturnValueOnce(true);
      mockMethods.checkUnique.mockReturnValueOnce(false);
      await expect(
        userValidator.validate({} as IUser, mockDatabase),
      ).rejects.toThrow();
    });
  });
});
