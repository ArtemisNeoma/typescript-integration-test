import { ICreateUserService } from 'interfaces/domain/services/service';
import { IRepositoryUser, IUser } from 'interfaces/domain/repository';
import { inject, injectable } from 'tsyringe';
import { IUserValidator } from '@interfaces/domain/services/validation';
@injectable()
export default class CreateUserService implements ICreateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IRepositoryUser,
    @inject('UserValidator')
    private validator: IUserValidator,
  ) {}

  public async create(user: IUser): Promise<IUser> {
    await this.validator.validate(user, this.repository.readAll());
    this.repository.create(user);
    return user;
  }
}
