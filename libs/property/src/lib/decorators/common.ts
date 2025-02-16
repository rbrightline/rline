import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidationOptions } from 'class-validator';
import { CommonPropertyOptions } from '../types';

/**
 * Common property decorator, manages the common validation options such as `required`.
 * @param options
 * @param validationOptions
 * @returns
 */
export function CommonProperty(
  options: CommonPropertyOptions,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    if (options.required === true) {
      IsNotEmpty(validationOptions)(t, p);
    } else {
      IsOptional(validationOptions)(t, p);
    }

    if (options.expose === false) {
      Exclude()(t, p);
    } else {
      Expose()(t, p);
    }
  };
}
