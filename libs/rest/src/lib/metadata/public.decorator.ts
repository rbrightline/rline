import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PUBLIC = Symbol('PUBLIC');
/**
 * Set the resource's public metadata true
 * @returns
 */
export function Public(): CustomDecorator {
  return ((t, p, d) => {
    SetMetadata(PUBLIC, true)(t, p, d);
  }) as CustomDecorator;
}
