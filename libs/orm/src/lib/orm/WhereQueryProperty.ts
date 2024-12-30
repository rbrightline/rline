/**
 * Decorator that applies multiple decorators to a property for handling
 * where query strings in an ORM context.
 *
 * This decorator applies the following decorators:
 * - `@ApiProperty`: Adds metadata for Swagger documentation.
 * - `@Expose`: Marks the property to be included in the transformation process.
 * - `@TransformWhereString`: Custom transformation logic for where query strings.
 *
 * @returns {PropertyDecorator} The composed property decorator.
 *
 * @example
 * class Example {
 *   @WhereQueryProperty()
 *   public whereQuery: string;
 * }
 */
import { ApiProperty } from '@nestjs/swagger';
import { TransformWhereString } from '../transform/TransformWhereString';
import { Expose } from 'class-transformer';

export function WhereQueryProperty(): PropertyDecorator {
  return function (t: Object, p: string | symbol): void {
    ApiProperty({
      type: 'array',
      description: 'Where query string',
      items: {
        type: 'string',
      },
      example: ['name::eq::some', 'age::mt::22'],
      nullable: true,
    })(t, p);
    Expose()(t, p);
    TransformWhereString()(t, p);
  };
}
