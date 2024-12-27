import { ApiProperty } from '@nestjs/swagger';
import { parseOrderString } from '@rline/query';
import { Transform } from 'class-transformer';
import { Type } from '@nestjs/common';

/**
 * Property decorator for entity properties that transform query-string into order order object.
 * @param keys
 * @returns
 */
export function OrderProperty(entity?: Type): PropertyDecorator {
  return (t, p) => {
    ApiProperty({ type: 'string', required: false, default: 'id::ASC' })(t, p);
    Transform(({ value }) => {
      const orderItem = parseOrderString(value);

      if (orderItem && orderItem.property && orderItem.direction) {
        if (entity)
          if (Object.keys(entity).includes(orderItem.property))
            return { [orderItem.property]: orderItem.direction };
      }
      return undefined;
    })(t, p);
  };
}
