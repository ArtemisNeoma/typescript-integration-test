import { IVariableDatabase } from '@interfaces/domain/repository';
import { IUserValidator } from '@interfaces/domain/services/validation';
import { IUser } from '@interfaces/domain/user/repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UserValidator implements IUserValidator {
  readonly _getCep: (value: string) => Promise<boolean>;
  readonly _isCpfValid: (cpf: string) => boolean;
  readonly _checkUnique: (
    value: string,
    fieldName: keyof IUser,
    database: IVariableDatabase,
  ) => boolean;
  constructor(
    @inject('getCep')
    getCep: (value: string) => Promise<boolean>,
    @inject('isCpfValid')
    isCpfValid: (cpf: string) => boolean,
    @inject('checkUnique')
    checkUnique: (
      value: string,
      fieldName: keyof IUser,
      database: IVariableDatabase,
    ) => boolean,
  ) {
    this._getCep = getCep;
    this._isCpfValid = isCpfValid;
    this._checkUnique = checkUnique;
  }

  public async validate(user: IUser, database: IVariableDatabase) {
    if (!(await this._getCep(user.postal_code)))
      throw Error(`Postal Code ${user.postal_code} is invalid`);
    if (!this._isCpfValid(user.cpf)) throw Error(`CPF ${user.cpf} is invalid`);
    if (!this._checkUnique(user.email, 'email', database))
      throw Error(`Email ${user.email} already exists`);
    if (!this._checkUnique(user.cpf, 'cpf', database))
      throw Error(`CPF ${user.cpf} already exists`);
  }
}
