import { CommonPropertyOptions } from './common';

export type __BooleanPropertyOptions = {
  type: 'boolean';
  example?: boolean;
  default?: boolean;
  isBooleanString?: boolean;
};

export type BooleanPropertyOptions = Readonly<
  __BooleanPropertyOptions & CommonPropertyOptions
>;
