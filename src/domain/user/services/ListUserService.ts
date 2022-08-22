import {
  IDatabaseObject,
  IListUserService,
} from 'interfaces/domain/services/service';
import { IRepositoryUser } from 'interfaces/domain/repository';
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
      const usersJSON = Object.fromEntries(allUsers);
      return usersJSON;
    } catch (err) {
      throw this.readingError;
    }
  }
}
