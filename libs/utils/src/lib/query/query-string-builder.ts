import { QueryItem, QueryItems } from './query-item';
import { QUERY_STRING_DELIMETER } from './query-string-delimeter';

/**
 * A class to build query strings from query items.
 */
export class QueryStringBuilder {
  /**
   * A collection of query items.
   */
  protected readonly items: QueryItems = [];

  /**
   * Adds a query item to the collection.
   * @param item - The query item to add.
   * @returns The current instance of QueryStringBuilder.
   */
  add(item: QueryItem): QueryStringBuilder {
    this.items.push(item);
    return this;
  }

  /**
   * Builds the query string from the collection of query items.
   * @returns The constructed query string.
   */
  build(): string {
    return this.items
      .map((item) => {
        return `where=${item.key}${QUERY_STRING_DELIMETER}${item.operator}${QUERY_STRING_DELIMETER}${item.value}`;
      })
      .join('&');
  }
}
