import { Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Read all
 * @param path
 * @param type response type
 * @returns
 */
export function Read(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    ApiOperation({ summary: 'Read all' })(t, p, d);
    ApiOkResponse({ type: type(), isArray: true })(t, p, d);
    Get(path)(t, p, d);
  };
}
