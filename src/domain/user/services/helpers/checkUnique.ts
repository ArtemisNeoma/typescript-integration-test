import { IUser, IVariableDatabase } from '@interfaces/domain/repository';

export const checkUnique = (
  field: string,
  fieldName: keyof IUser,
  database: IVariableDatabase,
) => {
  const usersArray = Array.from(database.values());
  let result = true;
  usersArray.map((value: IUser) => {
    if (value[fieldName] === field) {
      result = false;
    }
  });
  return result;
};

export default checkUnique;
