import { Property } from '@rline/property';

export function IDProperty(): PropertyDecorator {
  return (t, p) => {
    Property({ type: 'integer', minimum: 1, required: true, format: 'string' })(
      t,
      p
    );
  };
}
