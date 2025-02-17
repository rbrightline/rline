import { Property, PropertyOptions } from '@rline/property';
import { ArrayColumn } from './array';
import { BooleanColumn } from './boolean';
import { IntegerColumn } from './integer';
import { NumberColumn } from './number';
import { ObjectColumn } from './object';
import { StringColumn } from './string';

export function Column(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    const type = options.type;

    Property(options)(t, p);

    switch (type) {
      case 'string':
        StringColumn(options)(t, p);
        break;
      case 'number':
        NumberColumn(options)(t, p);
        break;
      case 'integer':
        IntegerColumn(options)(t, p);
        break;
      case 'boolean': {
        BooleanColumn(options)(t, p);
        break;
      }
      case 'object':
        ObjectColumn(options)(t, p);
        break;
      case 'array':
        ArrayColumn(options)(t, p);
        break;
    }
  };
}
