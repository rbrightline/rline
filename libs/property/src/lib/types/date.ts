import { CommonPropertyOptions } from './common';

export type __DatePropertyOptions = Readonly<{
  type: 'date';
  example?: Date;
  default?: Date;
  isPastDate?: boolean;
  isFutureDate?: boolean;
  enum?: Date[];
  minDate?: Date;
  maxDate?: Date;
  isDateString?: boolean;
}>;

export type DatePropertyOptions = Readonly<
  __DatePropertyOptions & CommonPropertyOptions
>;
