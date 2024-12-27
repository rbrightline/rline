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
