import { isQueryString } from './is-query-string';

export type QueryOperatorPicker<T> = (operator: string, value: any) => T;

/**
 * Parses a query string into a record with a single key-value pair.
 *
 * @template T - The type of the value in the resulting record (such as typeorm's FindOperator).
 * @param queryString - The query string to parse. It should be in the format `property::operator::value`.
 * @param operatorPicker - A function that takes an operator string and returns a function that takes a value string and returns a value of type T.
 * @returns A record where the key is the property from the query string and the value is the result of applying the operatorPicker to the operator and value from the query string.
 *
 */
export function parseQueryString<T>(
  queryString: string,
  operatorPicker: QueryOperatorPicker<T>
): Record<string, T> | null {
  if (isQueryString(queryString) === false) return null;

  const [property, operator, value] = queryString.split('::');
  return { [property]: operatorPicker(operator, value) };
}
