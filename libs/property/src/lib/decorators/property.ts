import { ValidationOptions } from 'class-validator';
import { PropertyOptions } from '../types/property';
import { ApiProperty } from './api-property';
import { ArrayProperty } from './array';
import { BooleanProperty } from './boolean';
import { CommonProperty } from './common';
import { DateProperty } from './date';
import { IntegerProperty } from './integer';
import { NumberProperty } from './number';
import { ObjectProperty } from './object';
import { StringProperty } from './string';

export function __Property(
  options: PropertyOptions,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    switch (options.type) {
      case 'string': {
        StringProperty(options, validationOptions)(t, p);
        break;
      }
      case 'number': {
        NumberProperty(options, validationOptions)(t, p);
        break;
      }
      case 'integer': {
        IntegerProperty(options, validationOptions)(t, p);
        break;
      }
      case 'boolean': {
        BooleanProperty(options, validationOptions)(t, p);
        break;
      }

      case 'date':
        DateProperty(options, validationOptions)(t, p);
        break;

      case 'object': {
        ObjectProperty(options, validationOptions)(t, p);
        break;
      }

      case 'array': {
        ArrayProperty(options, validationOptions)(t, p);
        __Property(options.items, { each: true })(t, p);
        break;
      }
    }
  };
}

/**
 * Property decorator for data-transfer-object, which is a wrapper around `class-validator`, `class-transformer`, and `@nestjs/swagger` decorator.
 * @returns property decorator {@link PropertyDecorator}
 */
export function Property(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    __Property(options)(t, p);
    ApiProperty(options)(t, p);
    CommonProperty(options)(t, p);
  };
}
