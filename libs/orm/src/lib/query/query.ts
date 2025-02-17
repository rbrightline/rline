import { BooleanQueryProperty } from './boolean';
import { DateQueryProperty } from './date';
import { IntegerQueryProperty } from './integer';
import { NumberQueryProperty } from './number';
import { StringQueryProperty } from './string';

export type QueryPropertyOptions = {
  type: 'string' | 'number' | 'integer' | 'boolean' | 'date';
};
export function QueryProperty(
  options: QueryPropertyOptions
): PropertyDecorator {
  return (t, p) => {
    switch (options.type) {
      case 'string':
        StringQueryProperty()(t, p);
        break;
      case 'boolean':
        BooleanQueryProperty()(t, p);
        break;
      case 'date':
        DateQueryProperty()(t, p);
        break;
      case 'integer':
        IntegerQueryProperty()(t, p);
        break;
      case 'number':
        NumberQueryProperty()(t, p);
        break;
    }
  };
}
