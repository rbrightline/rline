import { Delete, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Unset relation by id, relationName(:rn) method decorator
 * @param path rest path
 * @param type response type
 * @returns
 */
export function UnsetRelation(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    ApiOperation({
      summary: 'Set relation (many-to-one or one-to-one)',
    })(t, p, d);
    ApiOkResponse({ type, description: 'Success' })(t, p, d);
    Delete(path)(t, p, d);
  };
}
