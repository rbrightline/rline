import { DefaultValueOption } from './default-value-options';

export type BooleanValidationOptions = {
  type?: 'boolean';
} & DefaultValueOption<boolean>;
