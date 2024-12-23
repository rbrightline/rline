import { ArrayValidationOptions } from './ArrayValidationOptions';
import { BooleanValidationOptions } from './BooleanValidationOptions';
import { CommonValidationOptions } from './CommonValidationOptions';
import { NumberValidationOptions } from './NumberValidationOptions';
import { ObjectValidationOptions } from './ObjectValidationOptions';
import { PropertyType } from './PropertyType';
import { StringValidationOptions } from './StringValidationOptions';

export type ValidationOptions = Partial<
  {
    type: PropertyType;
  } & CommonValidationOptions &
    (
      | StringValidationOptions
      | NumberValidationOptions
      | BooleanValidationOptions
      | ObjectValidationOptions
      | ArrayValidationOptions
    )
>;
