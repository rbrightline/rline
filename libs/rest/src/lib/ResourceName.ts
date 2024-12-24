import { SetMetadata } from '@nestjs/common';
import { parseResourceName } from './parse-resource-name';

export const RESOURCE_NAME_TOKEN = 'RESOURCE_NAME_TOKEN';
/**
 * Resource name metadata
 * @returns
 */
export function ResourceName(resourceName: string): ClassDecorator {
  return (t) => {
    const names = parseResourceName(resourceName);
    SetMetadata(RESOURCE_NAME_TOKEN, names.singular)(t);
  };
}
