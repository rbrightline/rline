import { Transform } from 'class-transformer';
import { IsDate, isDateString, ValidationOptions } from 'class-validator';
import { DatePropertyOptions } from '../types';

export function DateProperty(
  options: DatePropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsDate(validationOptions)(t, p);
    if (options.isDateString) {
      Transform(({ value }) => {
        if (typeof value === 'string') {
          if (isDateString(value)) {
            return new Date(value);
          }
        }
        return value;
      })(t, p);
    }
  };
}
