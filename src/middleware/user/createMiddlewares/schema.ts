import Joi, { StringSchema } from 'joi';
import {
  booleanValidation,
  dateValidation,
  numberStringValidation,
  stringValidation,
} from '@util/validation/baseValidators';
import { ISchema } from '@interfaces/middleware';
import { IUser } from '@interfaces/domain/user/repository';

const { object } = Joi.types();

const emailValidation = (name: string): StringSchema =>
  stringValidation({ name }).email({ tlds: false });

const userCreateSchema: ISchema<IUser> = object
  .keys({
    full_name: stringValidation({
      name: 'full_name',
      min: 1,
      max: 256,
    }).required(),
    email: emailValidation('email').required(),
    email_confirmation: emailValidation('email_confirmation')
      .valid(Joi.ref('email'))
      .required(),
    cpf: numberStringValidation({ name: 'cpf', min: 11, max: 14 }).required(),
    cellphone: numberStringValidation({
      name: 'cellphone',
      min: 11,
      max: 15,
    }).required(),
    birthdate: dateValidation({ name: 'birthdate', max: 'now' }).required(),
    email_sms: booleanValidation(),
    whatsapp: booleanValidation(),
    country: stringValidation({ name: 'country', min: 1, max: 256 }).required(),
    city: stringValidation({ name: 'city', min: 1, max: 256 }).required(),
    postal_code: numberStringValidation({
      name: 'postal_code',
      min: 8,
      max: 9,
    }).required(),
    address: stringValidation({ name: 'address', min: 1, max: 256 }).required(),
  })
  .or('email_sms', 'whatsapp')
  .options({
    abortEarly: false,
  });

export default userCreateSchema;
