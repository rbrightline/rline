import { Put, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Add relation by id, relationName(:rn), and relationId(:rid) method decorator
 * @param path rest path
 * @param type response type
 * @returns
 */
export function AddRelation(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    ApiOperation({
      summary: 'Add relation (many-to-many or one-to-many)',
    })(t, p, d);
    ApiOkResponse({ type: type(), description: 'Success' })(t, p, d);
    Put(path)(t, p, d);
  };
}
