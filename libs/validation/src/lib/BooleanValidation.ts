import { IsBoolean, ValidationOptions } from 'class-validator';
import { BooleanValidationOptions } from './BooleanValidationOptions';
import { CommonValidationOptions } from './CommonValidationOptions';

export function BooleanValidation(
  options: Partial<BooleanValidationOptions & CommonValidationOptions>,
  voptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsBoolean(voptions)(t, p);
  };
}
