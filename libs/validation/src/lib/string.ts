import {
  IsIn,
  IsString,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { StringValidationOptions } from './string-options';
import { CommonValidationOptions } from './common-options';

export function StringValidation(
  options: Partial<StringValidationOptions & CommonValidationOptions>,
  voptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsString(voptions)(t, p);

    if (options.enum) IsIn(options.enum, voptions)(t, p);

    if (options.minLength != undefined)
      MinLength(options.minLength, voptions)(t, p);
    if (options.maxLength != undefined)
      MaxLength(options.maxLength, voptions)(t, p);
  };
}
