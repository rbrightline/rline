import { DefaultValueOption } from './default-value-options';

export type NumberValidationOptions = {
  type?: 'number' | 'integer';
  minimum: number;
  maximum: number;
  default: number;
} & DefaultValueOption<number>;
