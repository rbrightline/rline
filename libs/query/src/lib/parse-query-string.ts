import { isQueryString } from './is-query-string';
import { QUERY_DELIMETER } from './query-delimeter';
import { QueryItem } from './query-item';

/**
 * Parse query-string into QueryItem.
 * @param queryString
 * @returns
 */
export function parseQueryString(queryString: string): QueryItem | undefined {
  if (isQueryString(queryString)) {
    const [operator, value] = queryString.split(QUERY_DELIMETER);
    return { operator, value } as QueryItem;
  }

  return undefined;
}
