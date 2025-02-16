import { IsNumber, Max, Min, ValidationOptions } from 'class-validator';
import { NumberStringTransformer } from '../transform';
import { NumberPropertyOptions } from '../types';

export function NumberProperty(
  options: NumberPropertyOptions,
  valiationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    IsNumber(undefined, valiationOptions)(t, p);

    const { minimum, maximum } = options;
    if (minimum != undefined) Min(minimum, valiationOptions)(t, p);
    if (maximum != undefined) Max(maximum, valiationOptions)(t, p);

    if (options.isNumberString === true) {
      NumberStringTransformer()(t, p);
    }
  };
}
