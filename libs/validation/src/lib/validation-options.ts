import { ArrayValidationOptions } from './array-options';
import { BooleanValidationOptions } from './boolean-options';
import { CommonValidationOptions } from './common-options';
import { NumberValidationOptions } from './number-options';
import { ObjectValidationOptions } from './object-options';
import { PropertyType } from './property-type';
import { StringValidationOptions } from './string-options';

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
