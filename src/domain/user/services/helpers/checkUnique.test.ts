import { IVariableDatabase } from '@interfaces/domain/repository';
import { IUser } from '@interfaces/domain/user/repository';
import checkUnique from './checkUnique';

const mockDatabase: IVariableDatabase = new Map<number, IUser>();
const mockUser: IUser = { email: 'test@test.com.br' } as IUser;

describe('checkUnique', () => {
  describe('checkUnique', () => {
    it('Should return true when checking a unique item', () => {
      expect(checkUnique(mockUser.email, 'email', mockDatabase)).toBe(true);
    });
    it('Should return false when checking an already existing item', () => {
      mockDatabase.set(0, mockUser);
      expect(checkUnique(mockUser.email, 'email', mockDatabase)).toBe(false);
    });
  });
});
