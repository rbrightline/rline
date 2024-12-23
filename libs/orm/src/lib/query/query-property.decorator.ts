import { Property } from '@rline/property';
import { parseQueryString, QueryOperator } from '@rline/query';
import { Transform } from 'class-transformer';
import {
  Equal,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

/**
 * Property decorator for entity properties that transform query-string into typeorm find operators.
 * @param keys
 * @returns
 */
export function QueryProperty(keys: string[]): PropertyDecorator {
  return (t, p) => {
    Property({
      type: 'string',
      required: false,
      nullable: true,
      example: 'eq:query string',
    })(t, p);

    Transform(({ value }) => {
      const query = parseQueryString(value);

      if (query) {
        const operator = query.operator;
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
      }

      return undefined;
    })(t, p);
  };
}
