import { DefaultValueOption } from './default-value-options';

export type ObjectValidationOptions<T = any> = {
  type?: 'object';
  target: () => any;
  default: any;
} & DefaultValueOption<T>;
