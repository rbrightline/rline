import { Transform } from 'class-transformer';

export function TransformValue(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value == 'string') {
        try {
          return JSON.parse(value);
        } catch {}
      }
      return value;
    })(t, p);
  };
}
