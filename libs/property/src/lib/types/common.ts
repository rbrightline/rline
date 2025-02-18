import { PropertyType } from './property-type';

export type CommonPropertyOptions = Readonly<{
  type: PropertyType;
  deprecated?: boolean;
  required?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  description?: string;
  expose?: boolean;
  default?: any;
}>;
