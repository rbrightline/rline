import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PUBLIC = Symbol('PUBLIC');

export function Public(): CustomDecorator {
  return ((target?: any, property?: any, descriptor?: any) => {
    SetMetadata(PUBLIC, true)(target, property, descriptor);
  }) as CustomDecorator;
}
