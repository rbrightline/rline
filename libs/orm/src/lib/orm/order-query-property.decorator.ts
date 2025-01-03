import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OrderStringTransform } from '../transform/order-string.transform';

/**
 * Property decorator for entity properties that transform query-string into order order object.
 * @param keys
 * @returns
 */
export function OrderQueryProperty(): PropertyDecorator {
  return (t, p) => {
    ApiProperty({
      type: 'string',
      description:
        'Order query string is a composed string of property::direction such as <property-name>::<ASC | DESC> ',
      required: false,
    })(t, p);
    Expose()(t, p);
    OrderStringTransform()(t, p);
  };
}
