import { Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Read one by id method decorator
 * @param path rest path
 * @param type response type
 * @returns
 */
export function ReadOneById(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    ApiOperation({ summary: 'Read one by id' })(t, p, d);
    ApiOkResponse({ type: type(), description: 'Success' })(t, p, d);
    Get(path)(t, p, d);
  };
}
