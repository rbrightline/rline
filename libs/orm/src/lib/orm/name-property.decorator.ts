import { Property } from '@rline/property';

export function NameProperty(): PropertyDecorator {
  return (t, p) => {
    Property({ type: 'string', maxLength: 30, required: true })(t, p);
  };
}
