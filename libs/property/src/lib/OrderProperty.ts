import { ApiProperty } from '@nestjs/swagger';
import { parseOrderString } from '@rline/query';
import { Transform } from 'class-transformer';

/**
 * Property decorator for entity properties that transform query-string into order order object.
 * @param keys
 * @returns
 */
export function OrderProperty(): PropertyDecorator {
  return (t, p) => {
    ApiProperty({ type: 'string', required: false, default: 'id::ASC' })(t, p);
    Transform(({ value }) => {
      const orderItem = parseOrderString(value);
      if (orderItem && orderItem.property && orderItem.direction) {
        return { [orderItem.property]: orderItem.direction };
      }
      return undefined;
    })(t, p);
  };
}
