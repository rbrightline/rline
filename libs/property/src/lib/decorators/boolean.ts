import { Transform } from 'class-transformer';
import { IsBoolean, ValidationOptions } from 'class-validator';
import { BooleanPropertyOptions } from '../types';

export function BooleanProperty(
  options: BooleanPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsBoolean(validationOptions)(t, p);
    if (options.isBooleanString) {
      Transform(({ value }) => {
        if (value === 'true') {
          return true;
        } else if (value === 'false') {
          return false;
        }
        return 'not boolean';
      })(t, p);
    }
  };
}
