import { Transform } from 'class-transformer';
import { isBooleanString } from 'class-validator';

export function BooleanStringTransformer(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (isBooleanString(value)) {
        if (value === 'true') {
          return true;
        } else if (value === 'false') {
          return false;
        }
      } else if (typeof value === 'boolean') {
        return value;
      }
      return undefined;
    })(t, p);
  };
}
