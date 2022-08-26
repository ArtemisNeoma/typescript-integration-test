import container from '@di/index';
import { IUser } from '@interfaces/domain/user/repository';
import UserRepository from './UserRepository';

const userRepository = container.resolve(UserRepository);
const mockUser = {} as IUser;
const mockUserUpdated = {} as IUser;
const mockDatabaseGet = jest.spyOn(UserRepository.prototype, 'database', 'get');

beforeAll(() => {
  mockUserUpdated.email = 'test@test.com';
});

beforeEach(() => {
  mockDatabaseGet.mockReturnValue(new Map<number, IUser>());
});
describe('UserRepository', () => {
  describe('getNewIndex', () => {
    it('Should return 0 when calculating new index for an empty database', () => {
      expect(userRepository.getNewIndex()).toBe(0);
    });
    it('Should return the biggest id + 1 (2+1=3) when calculating new index for a database', () => {
      mockDatabaseGet.mockReturnValueOnce(
        new Map<number, IUser>().set(0, mockUser).set(2, mockUser),
      );
      expect(userRepository.getNewIndex()).toBe(3);
    });
  });
  describe('create', () => {
    it('Should return new user when running the create method', () => {
      expect(userRepository.create(mockUser)).toEqual(mockUser);
    });
  });
  describe('read', () => {
    it('Should return the matching index user when index exists', () => {
      mockDatabaseGet.mockReturnValueOnce(
        new Map<number, IUser>().set(0, mockUser),
      );
      expect(userRepository.read(0)).toEqual(mockUser);
    });
    it('Should return undefined when getting an absent index', () => {
      expect(userRepository.read(0)).toEqual(undefined);
    });
  });
  describe('readAll', () => {
    it("Should return empty database when userRepository's database is empty", () => {
      expect(userRepository.readAll()).toBe(userRepository.database);
    });
    it("Should return filled database when userRepository's database is filled", () => {
      mockDatabaseGet.mockReturnValue(
        new Map<number, IUser>()
          .set(0, mockUser)
          .set(1, mockUser)
          .set(2, mockUser),
      );
      expect(userRepository.readAll()).toBe(userRepository.database);
    });
  });
  describe('update', () => {
    it('Should return updated user when updating user', () => {
      mockDatabaseGet.mockReturnValue(
        new Map<number, IUser>().set(0, mockUser),
      );
      expect(userRepository.update(0, mockUserUpdated)).toBe(mockUserUpdated);
    });
  });
  describe('delete', () => {
    it('Should return true when deleting an entry that exists', () => {
      mockDatabaseGet.mockReturnValue(
        new Map<number, IUser>().set(0, mockUser),
      );
      expect(userRepository.delete(0)).toBe(true);
    });
    it("Should return false when deleting an entry that doesn't exists", () => {
      expect(userRepository.delete(0)).toBe(false);
    });
  });
});
