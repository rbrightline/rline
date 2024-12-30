import { PropertyFormat } from './property-format';
import { PropertyType } from './property-type';

export type CommonValidationOptions = {
  type: PropertyType;
  required: boolean;
  format: PropertyFormat;
  default: any;
};
