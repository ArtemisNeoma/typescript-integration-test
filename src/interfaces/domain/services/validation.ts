import { IUser, IVariableDatabase } from '../repository';
export interface IUserValidator {
  validate(user: IUser, database: IVariableDatabase): Promise<void>;
}
