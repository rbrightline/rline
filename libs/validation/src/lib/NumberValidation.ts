import { IsInt, IsNumber, Max, Min, ValidationOptions } from 'class-validator';
import { NumberValidationOptions } from './NumberValidationOptions';
import { CommonValidationOptions } from './CommonValidationOptions';

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

    options.minimum && Min(options.minimum, voptions)(t, p);
    options.maximum && Max(options.maximum, voptions)(t, p);
  };
}
