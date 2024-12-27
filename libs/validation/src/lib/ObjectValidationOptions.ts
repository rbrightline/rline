import { DefaultValueOption } from './DefaultValueOption';

export type ObjectValidationOptions<T = any> = {
  type?: 'object';
  target: () => any;
  default: any;
} & DefaultValueOption<T>;
