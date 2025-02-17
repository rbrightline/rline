import { Transform } from 'class-transformer';
import { pickNumberOperator } from './pick-number-operator';

export function NumberQueryProperty(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        if (value.length > 100) return undefined;
        const [operator, __queryValue] = value.split(':');
        const queryValue = parseFloat(__queryValue);
        if (isNaN(queryValue)) return undefined;
        return pickNumberOperator(operator, queryValue);
      }
      return undefined;
    })(t, p);
  };
}
