import { DefaultValueOption } from './default-value-options';
import { ValidationOptions } from './validation-options';

export type ArrayValidationOptions =
  | {
      type?: 'array';
      maxSize: number;
      minSize: number;
      items: ValidationOptions;
      format: string;
    } & DefaultValueOption<Array<any>>;
