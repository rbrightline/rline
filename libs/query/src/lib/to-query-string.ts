import { isQueryString } from './is-query-string';
import { QUERY_DELIMETER } from './query-delimeter';
import { QueryItem } from './query-item';

/**
 * Create query string from {@link QueryItem}.
 * @param queryItem
 * @returns
 */
export function toQueryString(queryItem: QueryItem): string | undefined {
  if (queryItem.operator && queryItem.value) {
    const queryString = `${queryItem.operator}${QUERY_DELIMETER}${queryItem.value}`;
    if (isQueryString(queryString)) return queryString;
  }
  return undefined;
}
