import { Type } from 'class-transformer';
import { IsObject, ValidateNested, ValidationOptions } from 'class-validator';
import { ObjectPropertyOptions } from '../types';

export function ObjectProperty<T>(
  options: ObjectPropertyOptions<T>,
  valiationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsObject(valiationOptions)(t, p);
    Type(options.target)(t, p);
    ValidateNested(valiationOptions)(t, p);
  };
}
