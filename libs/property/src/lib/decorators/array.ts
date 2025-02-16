import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidationOptions,
} from 'class-validator';
import { ArrayPropertyOptions } from '../types';

export function ArrayProperty<T>(
  options: ArrayPropertyOptions<T>,
  vo?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsArray(vo)(t, p);
    const { minItems, maxItems } = options;

    if (minItems != undefined) ArrayMinSize(minItems, vo)(t, p);
    if (maxItems != undefined) ArrayMaxSize(maxItems, vo)(t, p);
  };
}
