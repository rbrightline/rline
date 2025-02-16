import {
  IsString,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { StringPropertyOptions } from '../types';
import { __StringFormat } from './string-format';

export function StringProperty(
  options: StringPropertyOptions,
  valiationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    IsString(valiationOptions)(t, p);
    const { minLength, maxLength, stringFormat } = options;

    if (minLength != undefined) MinLength(minLength, valiationOptions)(t, p);
    if (maxLength != undefined) MaxLength(maxLength, valiationOptions)(t, p);

    if (stringFormat != undefined) __StringFormat(stringFormat);
  };
}
