import { IStatusError } from '@interfaces/util/error';

export default class StatusError extends Error implements IStatusError {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
