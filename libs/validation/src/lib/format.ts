import { PropertyFormat } from './property-format';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNumber,
  IsStrongPassword,
  IsUrl,
  IsUUID,
  Matches,
  Max,
  ValidationOptions,
} from 'class-validator';

export function FormatValidation(
  format: PropertyFormat,
  options?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    switch (format) {
      case 'binary':
        Matches(/[01]{0,}/, { ...options, message: `should be binary` })(t, p);
        break;
      case 'date':
      case 'date-time':
        IsDate(options)(t, p);
        break;

      case 'double':
      case 'float':
        IsNumber({}, options)(t, p);
        break;
      case 'byte':
        Max(255, options)(t, p);
        break;
      case 'int32':
      case 'int64':
        IsInt(options)(t, p);
        break;
      case 'email':
        IsEmail({}, options)(t, p);
        break;

      case 'hostname':
        Matches(/[a-z]{0,}/, { ...options, message: 'should be a hostname' })(
          t,
          p
        );
        break;

      case 'password':
        IsStrongPassword({}, options)(t, p);
        break;

      case 'uuid':
        IsUUID('4', options)(t, p);
        break;

      case 'uri':
        IsUrl({}, options)(t, p);
        break;
    }
  };
}
