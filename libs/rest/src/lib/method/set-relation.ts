import { Post, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Set relation by id, relationName(:rn), and relationId(:rid) method decorator
 * @param path rest path
 * @param type response type
 * @returns
 */
export function SetRelation(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    ApiOperation({
      summary: 'Set relation (many-to-one or one-to-one)',
    })(t, p, d);
    ApiOkResponse({ type: type(), description: 'Success' })(t, p, d);
    Post(path)(t, p, d);
  };
}
