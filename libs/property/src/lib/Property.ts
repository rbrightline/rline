/**
 * A decorator function that combines the functionality of `ApiProperty` from `@nestjs/swagger`,
 * `Expose` from `class-transformer`, and `Validation` from `@rline/validation`.
 * 
 * This decorator is used to define metadata for a property in a class, including API documentation,
 * serialization, and validation rules.
 * 
 * @param options - Partial options for the `ApiProperty` decorator. This includes properties like
 * `type`, `required`, `items`, etc.
 * @param target - An optional function that returns the target type for the property. This is used
 * for nested object validation.
 * 
 * @returns A property decorator function.
 */
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { PropertyType, Validation } from '@rline/validation';
import { Expose } from 'class-transformer';

export function Property(
  options: Partial<ApiPropertyOptions>,
  target?: () => any
): PropertyDecorator {
  return (t, p) => {
    ApiProperty({
      ...options,
      nullable: options.required != true,
      required: options.required == true,
    } as ApiPropertyOptions)(t, p);

    Expose()(t, p);

    const { type, required: isRequired } = options;
    const required = isRequired == true;

    if (type == 'array') {
      Validation(
        {
          type: 'array',
          required,
          items: options.items as any,
        },
        {},
        target
      )(t, p);
    } else if (type == 'object') {
      Validation({ type: 'object', required }, {}, target)(t, p);
    } else {
      Validation({
        ...(options as any),
        required,
        type: type as PropertyType,
      })(t, p);
    }
  };
}
