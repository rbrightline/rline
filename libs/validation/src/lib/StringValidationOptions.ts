import { DefaultValueOption } from './DefaultValueOption';

export type StringValidationOptions = {
  type?: 'string';
  minLength: number;
  maxLength: number;
  enum: string[];
} & DefaultValueOption<string>;
