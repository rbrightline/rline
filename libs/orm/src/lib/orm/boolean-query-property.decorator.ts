import { Property } from '@rline/property';
import { Transform } from 'class-transformer';

export type BooleanQueryPropertyOptions = {
  description?: string;
  default?: boolean;
};

export function BooleanQueryProperty(
  options?: BooleanQueryPropertyOptions
): PropertyDecorator {
  return (t: any, p: string | symbol) => {
    Transform(({ value }) =>
      value == 'true' ? true : value == 'false' ? false : value
    )(t, p);
    Property({ type: 'boolean', ...options })(t, p);
  };
}
