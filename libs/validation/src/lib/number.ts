import { IsInt, IsNumber, Max, Min, ValidationOptions } from 'class-validator';
import { NumberValidationOptions } from './number-options';
import { CommonValidationOptions } from './common-options';

export function NumberValidation(
  options: Partial<NumberValidationOptions & CommonValidationOptions>,
  voptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    if (options.type == 'integer') {
      IsInt(voptions)(t, p);
    } else {
      IsNumber({}, voptions)(t, p);
    }

    if (options.minimum != undefined) Min(options.minimum, voptions)(t, p);
    if (options.maximum != undefined) Max(options.maximum, voptions)(t, p);
  };
}
