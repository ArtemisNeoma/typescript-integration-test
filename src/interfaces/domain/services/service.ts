import { IUser } from '../user/repository';

export interface IDatabaseObject {
  [k: string]: IUser;
}

export interface ICreateUserService {
  create(user: IUser): Promise<IUser>;
}

export interface IListUserService {
  readAll(): IDatabaseObject;
}
