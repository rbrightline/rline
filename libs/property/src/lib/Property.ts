import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { PropertyType, Validation } from '@rline/validation';
import { Expose, Transform } from 'class-transformer';

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

      Transform(({ value }) => {
        if (value != undefined) {
          if ((options.items as any).type == 'string') {
            if (value != undefined && !Array.isArray(value)) {
              return [value];
            }
          }
          return JSON.parse(value);
        }
        return value;
      })(t, p);
    } else if (type == 'object') {
      Validation({ type: 'object', required }, {}, target)(t, p);

      if (options.format == 'string') {
        Transform(({ value }) => {
          if (typeof value === 'string') {
            return JSON.parse(value);
          }
        })(t, p);
      }
    } else {
      Validation({
        ...(options as any),
        required,
        type: type as PropertyType,
      })(t, p);

      if (options.type != 'string' && options.format == 'string') {
        Transform(({ value }) => {
          if (value != undefined) return JSON.parse(value);
          return value;
        })(t, p);
      }
    }
  };
}
