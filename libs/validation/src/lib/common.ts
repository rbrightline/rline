import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  ValidationOptions,
} from 'class-validator';
import { CommonValidationOptions } from './common-options';
import { FormatValidation } from './format';
import { DefaultValueTransform } from './default-value-transform';
import { TypeTransform } from './type-transform';

export function CommonValidation(
  options: Partial<CommonValidationOptions>,
  voptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    DefaultValueTransform(options.default)(t, p);
    TypeTransform(options)(t, p);

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
