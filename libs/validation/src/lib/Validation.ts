import { ArrayValidation } from './ArrayValidation';
import { BooleanValidation } from './BooleanValidation';
import { CommonValidation } from './CommonValidation';
import { NumberValidation } from './NumberValidation';
import { ObjectValidation } from './ObjectValidation';
import { StringValidation } from './StringValidation';
import { ValidationOptions } from './ValidationOptions';
import { ValidationOptions as __ValidationOptions } from 'class-validator';

export function Validation(
  options: ValidationOptions,
  voptions?: __ValidationOptions,
  target?: () => any
): PropertyDecorator {
  return (t, p) => {
    const type = options.type;

    CommonValidation(options, voptions)(t, p);

    switch (type) {
      case 'string':
        StringValidation(options, voptions)(t, p);
        break;

      case 'boolean':
        BooleanValidation(options, voptions)(t, p);
        break;

      case 'integer':
      case 'number':
        NumberValidation(options, voptions)(t, p);
        break;

      case 'object':
        ObjectValidation({ ...options, target }, voptions)(t, p);
        break;

      case 'array': {
        ArrayValidation(options, target)(t, p);
        break;
      }
    }
  };
}
