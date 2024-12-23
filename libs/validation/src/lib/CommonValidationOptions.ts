import { PropertyFormat } from './PropertyFormat';
import { PropertyType } from './PropertyType';

export type CommonValidationOptions = {
  type: PropertyType;
  required: boolean;
  format: PropertyFormat;
};
