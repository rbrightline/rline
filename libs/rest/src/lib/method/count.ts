import { Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Count entities
 * @param path rest path
 * @param type response type
 * @returns
 */
export function Count(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    ApiOperation({
      summary: 'Count',
    })(t, p, d);
    ApiOkResponse({ type, description: 'Success' })(t, p, d);
    Get(path)(t, p, d);
  };
}
