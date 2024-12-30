/**
 * Creates a query string from an array of query items.
 *
 * @param queryItems - An array of query items to be converted into a query string.
 * @returns A query string constructed from the provided query items.
 */
import { QueryItems } from './query-item';
import { QueryStringBuilder } from './query-string-builder';

export function createQueryString(queryItems: QueryItems): string {
  const builder = new QueryStringBuilder();

  queryItems.forEach((e) => builder.add(e));

  return builder.build();
}
