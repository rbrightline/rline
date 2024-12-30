import { IsObject, ValidateNested, ValidationOptions } from 'class-validator';
import { ObjectValidationOptions } from './object-options';
import { CommonValidationOptions } from './common-options';
import { Type } from 'class-transformer';

export function ObjectValidation(
  options: Partial<ObjectValidationOptions & CommonValidationOptions>,
  voptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    if (!options.target)
      throw new Error(`target option is required for object property`);

    IsObject(voptions)(t, p);
    ValidateNested(voptions)(t, p);
    Type(options.target)(t, p);
  };
}
