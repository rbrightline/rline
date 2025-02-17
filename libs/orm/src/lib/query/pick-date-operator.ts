import {
  Equal,
  FindOperator,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';

export function pickDateOperator(
  operator: string,
  value: Date
): FindOperator<Date> | undefined {
  switch (operator) {
    case 'eq':
      return Equal(value);
    case 'mt':
      return MoreThan(value);
    case 'lt':
      return LessThan(value);
    case 'mte':
      return MoreThanOrEqual(value);
    case 'lte':
      return LessThanOrEqual(value);
  }

  return;
}
