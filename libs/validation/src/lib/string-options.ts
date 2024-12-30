import { DefaultValueOption } from './default-value-options';

export type StringValidationOptions = {
  type?: 'string';
  minLength: number;
  maxLength: number;
  enum: string[];
} & DefaultValueOption<string>;
