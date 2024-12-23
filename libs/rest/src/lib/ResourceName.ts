import { SetMetadata } from '@nestjs/common';
import { parseResourceName } from './parse-resource-name';

export const RESOURCE_NAME_TOKEN = 'RESOURCE_NAME_TOKEN';
/**
 * Resource name metadata
 * @returns
 */
export function ResourceName(): ClassDecorator {
  return (t) => {
    const names = parseResourceName(t.constructor.name);
    SetMetadata(RESOURCE_NAME_TOKEN, names.singular)(t);
  };
}
