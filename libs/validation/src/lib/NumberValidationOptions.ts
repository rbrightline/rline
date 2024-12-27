import { DefaultValueOption } from './DefaultValueOption';

export type NumberValidationOptions = {
  type?: 'number' | 'integer';
  minimum: number;
  maximum: number;
  default: number;
} & DefaultValueOption<number>;
