import { Put, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Update entity by id method decorator
 * @param path rest path
 * @param type response type
 * @returns
 */
export function Update(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    ApiOperation({ summary: 'Update entity by id' })(t, p, d);
    ApiOkResponse({ type: type(), description: 'Success' })(t, p, d);
    Put(path)(t, p, d);
  };
}
