import { ValidationOptions } from './ValidationOptions';

export type ArrayValidationOptions = {
  type?: 'array';
  maxSize: number;
  minSize: number;
  items: ValidationOptions;
};
