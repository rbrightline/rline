import { Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Find all entitites, such as `/products`
 * @param path
 * @param type response type
 * @returns
 */
export function FindAll(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    Get(path)(t, p, d);
    ApiOperation({ summary: 'Find all items' })(t, p, d);
    ApiOkResponse({ type, isArray: true })(t, p, d);
  };
}
