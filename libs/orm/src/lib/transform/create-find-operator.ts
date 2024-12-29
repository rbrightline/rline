import { QueryOperator } from '@rline/type';
import {
  Equal,
  FindOperator,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

export function createFindOperator(
  operator: any,
  value: any
): FindOperator<any> | null {
  switch (operator) {
    case QueryOperator.CONTAIN:
      return ILike(`%${value}%`);
    case QueryOperator.END_WITH:
      return ILike(`%${value}`);
    case QueryOperator.START_WITH:
      return ILike(`${value}%`);
    case QueryOperator.EQUAL:
      return Equal(value);
    case QueryOperator.LESS_THAN:
      return LessThan(value);
    case QueryOperator.MORE_THAN:
      return MoreThan(value);
    case QueryOperator.LESS_THAN_OR_EQUAL:
      return LessThanOrEqual(value);
    case QueryOperator.MORE_THAN_OR_EQUAL:
      return MoreThanOrEqual(value);
    case QueryOperator.NOT_CONTAIN:
      return Not(ILike(`%${value}%`));
    case QueryOperator.NOT_END_WITH:
      return Not(ILike(`%${value}`));
    case QueryOperator.NOT_START_WITH:
      return Not(ILike(`${value}%`));
    case QueryOperator.NOT_EQUAL:
      return Not(Equal(value));
  }

  return null;
}
