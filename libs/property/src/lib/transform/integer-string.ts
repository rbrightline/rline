import { Transform } from 'class-transformer';

export function IntegerStringTransformer(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        if (value.length > 20) return undefined;
        const newValue = parseInt(value);
        if (isNaN(newValue)) return undefined;
        return newValue;
      } else if (typeof value === 'number') {
        return value;
      }
      return undefined;
    })(t, p);
  };
}
