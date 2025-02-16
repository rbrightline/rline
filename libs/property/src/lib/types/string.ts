import { CommonPropertyOptions } from './common';
import { StringFormat } from './string-format';

export type __StringPropertyOptions = Readonly<{
  type: 'string';
  example?: string;
  default?: number;
  stringFormat?: StringFormat;
  pattern?: RegExp;
  enum?: string[];
  minLength?: number;
  maxLength?: number;
  startsWith?: string;
  endsWith?: string;
  contains?: string;
  notContains?: string;
}>;

export type StringPropertyOptions = Readonly<
  __StringPropertyOptions & CommonPropertyOptions
>;
