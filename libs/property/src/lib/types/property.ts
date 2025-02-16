import { ArrayPropertyOptions } from './array';
import { BooleanPropertyOptions } from './boolean';
import { IntegerPropertyOptions } from './integer';
import { NumberPropertyOptions } from './number';
import { ObjectPropertyOptions } from './object';
import { StringPropertyOptions } from './string';

export type __PropertyOptions<T> = Readonly<
  | StringPropertyOptions
  | NumberPropertyOptions
  | IntegerPropertyOptions
  | BooleanPropertyOptions
  | ObjectPropertyOptions<any>
  | ArrayPropertyOptions<T>
>;

/**
 * Readonly property options
 */
export type PropertyOptions = Readonly<
  __PropertyOptions<__PropertyOptions<__PropertyOptions<any>>>
>;
