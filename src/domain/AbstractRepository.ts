import { IUser } from '@interfaces/domain/user/repository';
import {
  IEndPointsRepository,
  IVariableDatabase,
} from 'interfaces/domain/repository';

export default abstract class AbstractRepository
  implements IEndPointsRepository
{
  protected _database: IVariableDatabase = new Map<number, IUser>();
  public abstract create(entity: object): object | undefined;
  public abstract read(id: number): object | undefined;
  public abstract readAll(): IVariableDatabase;
  public abstract update(id: number, newEntity: object): object | undefined;
  public abstract delete(id: number): void;

  get database(): Map<number, IUser> {
    return this._database;
  }
}
