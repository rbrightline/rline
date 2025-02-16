/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty as __ApiProperty } from '@nestjs/swagger';
import { PropertyOptions } from '../types';

/**
 * Overriding the swagger ApiProperty by omitting unsuported properties of {@link PropertyOptions}
 * @param options
 * @returns
 */
export function ApiProperty(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    if (options.type === 'object') {
      const { target, ...rest } = options;

      __ApiProperty(rest as any)(t, p);
    } else if (options.type === 'array' && options.items.type === 'object') {
      const {
        items: { target: __iTarget, ...itemsRest },
        ...optionsRest
      } = options as any;
      __ApiProperty({ ...optionsRest, items: itemsRest })(t, p);
    } else {
      __ApiProperty({ ...(options as any) })(t, p);
    }
  };
}
