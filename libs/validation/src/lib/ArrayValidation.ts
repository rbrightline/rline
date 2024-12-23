import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ArrayValidationOptions } from './ArrayValidationOptions';
import { Validation } from './Validation';
import { Type } from 'class-transformer';

export function ArrayValidation(
  options: Partial<ArrayValidationOptions>,
  target?: () => any
): PropertyDecorator {
  return (t, p) => {
    if (!options.items)
      throw new Error('items property is required for array property');

    IsArray()(t, p);

    if (target) {
      ValidateNested({ each: true })(t, p);
      Type(target)(t, p);
    }

    Validation(options.items, { each: true }, target)(t, p);
    options.minSize && ArrayMinSize(options.minSize)(t, p);
    options.maxSize && ArrayMaxSize(options.maxSize)(t, p);
  };
}
