import { Transform } from 'class-transformer';
import { Equal } from 'typeorm';

export function BooleanQueryProperty(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (value == 'true') {
        return Equal(true);
      } else if (value === 'false') {
        return Equal(false);
      }
      return undefined;
    })(t, p);
  };
}
