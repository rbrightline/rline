import { Delete as __Delete, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
/**
 * Delete entity by id method decoarator
 * @param path rest path
 * @param type response type
 * @returns
 */
export function Delete(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    __Delete(path)(t, p, d);
    ApiOperation({ summary: 'Delete entity by id' })(t, p, d);
    ApiOkResponse({ type: type() })(t, p, d);
  };
}
