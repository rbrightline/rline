import { Post, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Save entity method decoarator
 * @param path rest path
 * @param type response type
 * @returns
 */
export function Save(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    ApiOperation({ summary: 'Save' })(t, p, d);
    ApiOkResponse({ type: type(), description: 'Success' })(t, p, d);
    Post(path)(t, p, d);
  };
}
