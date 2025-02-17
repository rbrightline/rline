import { Transform } from 'class-transformer';
import { pickStringOperator } from './pick-string-operator';

export function StringQueryProperty(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        if (value.length > 100) return undefined;
        const [operator, queryValue] = value.split(':');
        return pickStringOperator(operator, queryValue);
      }
      return undefined;
    })(t, p);
  };
}
