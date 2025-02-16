import { Type } from '@nestjs/common';
import { CommonPropertyOptions } from './common';

export type __ObjectPropertyOptions<T> = Readonly<{
  type: 'object';
  target: () => Type<T>;
  example?: T;
  default?: T;
  maxProperties?: number;
  minProperties?: number;
}>;

export type ObjectPropertyOptions<T> = Readonly<
  __ObjectPropertyOptions<T> & CommonPropertyOptions
>;
