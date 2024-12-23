import { isOrderString } from './is-order-string';
import { OrderItem } from './order-item';
import { QUERY_DELIMETER } from './query-delimeter';

/**
 * Parse order-query into {@link OrderItem}.
 * @param query
 * @returns
 */
export function parseOrderString(query: string): OrderItem | undefined {
  if (isOrderString(query)) {
    const [property, direction] = query.split(QUERY_DELIMETER);
    return {
      property,
      direction,
    } as OrderItem;
  }

  return undefined;
}
