import { IsInt, Max, Min, ValidationOptions } from 'class-validator';
import { IntegerStringTransformer } from '../transform';
import { IntegerPropertyOptions } from '../types';

export function IntegerProperty(
  options: IntegerPropertyOptions,
  valiationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    IsInt(valiationOptions)(t, p);

    const { minimum, maximum } = options;
    if (minimum != undefined) Min(minimum, valiationOptions)(t, p);
    if (maximum != undefined) Max(maximum, valiationOptions)(t, p);

    if (options.isIntegerString === true) {
      IntegerStringTransformer()(t, p);
    }
  };
}
