import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  ValidationOptions,
} from 'class-validator';
import { CommonValidationOptions } from './CommonValidationOptions';
import { FormatValidation } from './FormatValidation';

export function CommonValidation(
  options: Partial<CommonValidationOptions>,
  voptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    if (options.required) {
      IsNotEmpty(voptions)(t, p);
    } else {
      IsOptional(voptions)(t, p);
    }

    if (options.type == 'array') {
      if (options.required) {
        IsDefined(voptions)(t, p);
      }
    }

    options.format && FormatValidation(options.format, voptions)(t, p);
  };
}
