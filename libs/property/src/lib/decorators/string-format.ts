import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsUUID,
  ValidationOptions,
} from 'class-validator';
import { StringFormat } from '../types';

export function __StringFormat(
  format: StringFormat,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    if (format)
      switch (format) {
        case 'email':
          IsEmail(undefined, validationOptions)(t, p);
          break;
        case 'password':
          IsStrongPassword(undefined, validationOptions)(t, p);
          break;
        case 'phone':
          IsPhoneNumber(undefined, validationOptions)(t, p);
          break;
        case 'uuid4':
          IsUUID('4', validationOptions)(t, p);
      }
  };
}
