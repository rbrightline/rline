/**
 * A class decorator that applies the `Exclude` decorator from the `class-transformer` library
 * to the target class. This decorator is used to exclude properties from the transformation
 * process when serializing or deserializing objects.
 *
 * @returns {ClassDecorator} A class decorator function that applies the `Exclude` decorator.
 */
import { Exclude } from 'class-transformer';

export function Data(): ClassDecorator {
  return (t) => {
    Exclude()(t);
  };
}
