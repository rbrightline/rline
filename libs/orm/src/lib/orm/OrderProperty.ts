import { ApiProperty } from '@nestjs/swagger';
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
   
  };
}
