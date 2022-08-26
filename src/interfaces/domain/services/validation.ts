import { IVariableDatabase } from '../repository';
import { IUser } from '../user/repository';
export interface IUserValidator {
  validate(user: IUser, database: IVariableDatabase): Promise<void>;
}
