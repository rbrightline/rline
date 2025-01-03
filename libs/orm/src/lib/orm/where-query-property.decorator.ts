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
import { WhereStringTranform } from '../transform/where-string.transform';
import { Expose } from 'class-transformer';

export function WhereQueryProperty(): PropertyDecorator {
  return function (t: Object, p: string | symbol): void {
    ApiProperty({
      type: 'array',
      description:
        'Where query string is a composed string of property::operator::query such as id::eq::1 means id equals 1.',
      items: {
        type: 'string',
      },
      required: false,
    })(t, p);
    Expose()(t, p);
    WhereStringTranform()(t, p);
  };
}
