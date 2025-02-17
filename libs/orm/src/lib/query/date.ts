import { Transform } from 'class-transformer';
import { isDateString } from 'class-validator';
import { pickDateOperator } from './pick-date-operator';

export function DateQueryProperty(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        if (value.length > 100) return undefined;
        const [operator, __queryValue] = value.split(':');

        if (!isDateString(__queryValue)) return undefined;

        const queryValue = new Date(__queryValue);

        return pickDateOperator(operator, queryValue);
      }
      return undefined;
    })(t, p);
  };
}
