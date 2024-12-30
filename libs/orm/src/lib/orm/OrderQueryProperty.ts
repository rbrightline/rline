import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TransformOrderString } from '../transform/TransformOrderString';

/**
 * Property decorator for entity properties that transform query-string into order order object.
 * @param keys
 * @returns
 */
export function OrderQueryProperty(): PropertyDecorator {
  return (t, p) => {
    ApiProperty({
      type: 'string',
      nullable: true,
      default: 'id::ASC',
      example: 'id::ASC',
    })(t, p);
    Expose()(t, p);
    TransformOrderString()(t, p);
  };
}
