import { IVariableDatabase } from '../../repository';
import { IUser } from '../repository';
export interface IUserValidator {
  validate(user: IUser, database: IVariableDatabase): Promise<void>;
}
