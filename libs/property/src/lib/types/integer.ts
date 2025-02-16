import { CommonPropertyOptions } from './common';

export type __IntegerPropertyOptions = Readonly<{
  type: 'integer';
  minimum?: number;
  maximum?: number;
  enum?: number[];
  isEven?: boolean;
  isOdd?: boolean;
  example?: number;
  default?: number;
  isIntegerString?: boolean;
}>;

export type IntegerPropertyOptions = Readonly<
  __IntegerPropertyOptions & CommonPropertyOptions
>;
