import { CommonPropertyOptions } from './common';

export type __ArrayPropertyOptions<T> = Readonly<{
  type: 'array';
  items: T;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  isArrayString?: boolean;
}>;

export type ArrayPropertyOptions<T> = Readonly<
  __ArrayPropertyOptions<T> & CommonPropertyOptions
>;
