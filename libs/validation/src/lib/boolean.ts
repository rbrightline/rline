import { IsBoolean, ValidationOptions } from 'class-validator';
import { BooleanValidationOptions } from './boolean-options';
import { CommonValidationOptions } from './common-options';

export function BooleanValidation(
  options: Partial<BooleanValidationOptions & CommonValidationOptions>,
  voptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsBoolean(voptions)(t, p);
  };
}
