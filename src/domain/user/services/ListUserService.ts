import { IRepositoryUser } from '@interfaces/domain/user/repository';
import {
  IDatabaseObject,
  IListUserService,
} from '@interfaces/domain/user/services/service';
import { inject, injectable } from 'tsyringe';
@injectable()
export default class ListUserService implements IListUserService {
  readingError: Error = new Error('Failed to readAll database');
  constructor(
    @inject('UserRepository')
    private repository: IRepositoryUser,
  ) {}

  public readAll(): IDatabaseObject {
    try {
      const allUsers = this.repository.readAll();
      return Object.fromEntries(allUsers);
    } catch (err) {
      throw this.readingError;
    }
  }
}
