import { QueryOperator } from '@rline/type';
import { parseQueryString } from '@rline/utils';
import { Transform } from 'class-transformer';
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

/**
 * Transforms a given operator and value into a corresponding TypeORM `FindOperator`.
 *
 * @param operator - The query operator to transform. Expected to be one of the `QueryOperator` enum values.
 * @param value - The value to be used with the operator.
 * @returns A `FindOperator` corresponding to the given operator and value, or `null` if the operator is not recognized.
 *
 * Supported operators:
 * - `QueryOperator.CONTAIN`: Returns an `ILike` operator for a value contained within a string.
 * - `QueryOperator.END_WITH`: Returns an `ILike` operator for a value ending with a string.
 * - `QueryOperator.START_WITH`: Returns an `ILike` operator for a value starting with a string.
 * - `QueryOperator.EQUAL`: Returns an `Equal` operator for an exact match.
 * - `QueryOperator.LESS_THAN`: Returns a `LessThan` operator for values less than the given value.
 * - `QueryOperator.MORE_THAN`: Returns a `MoreThan` operator for values greater than the given value.
 * - `QueryOperator.LESS_THAN_OR_EQUAL`: Returns a `LessThanOrEqual` operator for values less than or equal to the given value.
 * - `QueryOperator.MORE_THAN_OR_EQUAL`: Returns a `MoreThanOrEqual` operator for values greater than or equal to the given value.
 * - `QueryOperator.NOT_CONTAIN`: Returns a `Not` operator for a value not contained within a string.
 * - `QueryOperator.NOT_END_WITH`: Returns a `Not` operator for a value not ending with a string.
 * - `QueryOperator.NOT_START_WITH`: Returns a `Not` operator for a value not starting with a string.
 * - `QueryOperator.NOT_EQUAL`: Returns a `Not` operator for values not equal to the given value.
 */
export function transformWhereString(
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

/**
 * A property decorator that transforms a string or an array of strings into an object
 * by parsing the query string using the `parseQueryString` function.
 *
 * @returns {PropertyDecorator} A property decorator function.
 *
 * The decorator handles the following cases:
 * - If the value is an array, it maps over each element, parses it if it's a string,
 *   and reduces the results into a single object.
 * - If the value is a string, it parses the string into an object.
 * - If the value is neither a string nor an array, it returns the value as is.
 *
 * @example
 * ```typescript
 * class Example {
 *   @TransformWhereString()
 *   public query: string;
 * }
 * ```
 */
export function TransformWhereString(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (Array.isArray(value)) {
        return value
          .map((v) => {
            if (typeof v !== 'string') return v;
            return parseQueryString(v, transformWhereString);
          })
          .reduce((acc, cur) => ({ ...acc, ...cur }), {});
      }

      if (typeof value !== 'string') return value;
      return parseQueryString(value, transformWhereString);
    })(t, p);
  };
}
