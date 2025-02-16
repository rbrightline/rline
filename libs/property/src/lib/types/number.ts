import { CommonPropertyOptions } from './common';

export type __NumberPropertyOptions = Readonly<{
  type: 'number';
  minimum?: number;
  maximum?: number;
  isEven?: boolean;
  isOdd?: boolean;
  enum?: number[];
  example?: number;
  default?: number;
  isNumberString?: boolean;
}>;

export type NumberPropertyOptions = Readonly<
  __NumberPropertyOptions & CommonPropertyOptions
>;
