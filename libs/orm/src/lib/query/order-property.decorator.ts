import { Property } from '@rline/property';
import { parseOrderString } from '@rline/query';
import { Transform } from 'class-transformer';

/**
 * Property decorator for entity properties that transform query-string into order order object.
 * @param keys
 * @returns
 */
export function OrderProperty(keys: string[]): PropertyDecorator {
  return (t, p) => {
    Property({ type: 'string', example: 'id:ASC' })(t, p);

    Transform(({ value }) => {
      const orderItem = parseOrderString(value);
      if (orderItem && orderItem.property && orderItem.direction) {
        if (keys.includes(orderItem.property)) {
          return { [orderItem.property]: orderItem.direction };
        }
      }
      return undefined;
    })(t, p);
  };
}
