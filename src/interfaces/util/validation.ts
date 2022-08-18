export interface IValidationOptions {
  name: string;
  min?: any;
  max?: any;
}
export interface IStringValidationOptions extends IValidationOptions {
  min?: number;
  max?: number;
}
export interface IDateValidationOptions extends IValidationOptions {
  min?: string | Date;
  max?: string | Date;
}
