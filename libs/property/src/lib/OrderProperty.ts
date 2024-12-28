import { ApiProperty } from '@nestjs/swagger';
import { parseOrderString } from '@rline/query';
import { Expose, Transform } from 'class-transformer';
import { Type } from '@nestjs/common';

/**
 * Property decorator for entity properties that transform query-string into order order object.
 * @param keys
 * @returns
 */
export function OrderProperty(entity: () => Type): PropertyDecorator {
  let keys = Object.keys(new (entity())());

  return (t, p) => {
    ApiProperty({ type: 'string', required: false, default: 'id::ASC' })(t, p);
    Expose()(t, p);
    Transform(({ value }) => {
      if (typeof value == 'string') {
        console.log('Order ...............................');
        console.log(value);
        const orderItem = parseOrderString(value);
        console.log(orderItem);
        console.log(keys);
        console.log('Order ...............................');
        if (orderItem && orderItem.property && orderItem.direction) {
          if (keys.includes(orderItem.property))
            return { [orderItem.property]: orderItem.direction };
        }
      }
      return undefined;
    })(t, p);
  };
}
