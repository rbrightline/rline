import { DefaultValueOption } from './DefaultValueOption';
import { ValidationOptions } from './ValidationOptions';

export type ArrayValidationOptions =
  | {
      type?: 'array';
      maxSize: number;
      minSize: number;
      items: ValidationOptions;
      format: string;
    } & DefaultValueOption<Array<any>>;
