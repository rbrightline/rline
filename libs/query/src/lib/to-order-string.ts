import { isOrderString } from './is-order-string';
import { OrderItem } from './order-item';
import { QUERY_DELIMETER } from './query-delimeter';

export function toOrderString(order: OrderItem): string | undefined {
  if (order.property && order.direction) {
    const queryString = `${order.property}${QUERY_DELIMETER}${order.direction}`;
    if (isOrderString(queryString)) return queryString;
  }

  return undefined;
}
