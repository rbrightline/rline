import {
  IsString,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { StringValidationOptions } from './StringValidationOptions';
import { CommonValidationOptions } from './CommonValidationOptions';

export function StringValidation(
  options: Partial<StringValidationOptions & CommonValidationOptions>,
  voptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsString(voptions)(t, p);

    options.minLength && MinLength(options.minLength, voptions)(t, p);
    options.maxLength && MaxLength(options.maxLength, voptions)(t, p);
  };
}
