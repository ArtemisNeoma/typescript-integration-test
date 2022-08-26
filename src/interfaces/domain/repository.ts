import { IUser } from './user/repository';

export type IVariableDatabase = Map<number, IUser>;

export interface IEndPointsRepository {
  create(entity: object): object | undefined;
  read(id: number): undefined | object;
  readAll(): IVariableDatabase;
  update(id: number, newEntity: object): object | undefined;
  delete(id: number): void;
}
