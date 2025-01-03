import { Property } from '@rline/property';
import { Transform } from 'class-transformer';

export function SelectQueryProperty(): PropertyDecorator {
  return (t: any, p: string | symbol) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return [value];
      }
      return value;
    })(t, p);
    Property({
      type: 'array',
      description:
        "Select the list of entity's  property names to be displayed in the query result.",
      items: { type: 'string' },
    })(t, p);
  };
}
