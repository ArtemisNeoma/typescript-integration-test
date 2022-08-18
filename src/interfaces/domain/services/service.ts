import { ValidationError } from 'joi';
import { IEndPointsRepository, IUser } from '../repository';

export interface IDatabaseObject {
  [k: string]: IUser;
}

export interface ICreateUserService {
  create(user: IUser): Promise<IUser>;
}

export interface IListUserService {
  readAll(): IDatabaseObject;
}
