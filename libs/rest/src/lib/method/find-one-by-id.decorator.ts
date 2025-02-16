import { Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function FindOneById(path: string, type: () => Type): MethodDecorator {
  return (t, p, d) => {
    ApiOperation({ summary: 'Find one entity by id' })(t, p, d);
    ApiOkResponse({ type, description: 'Success' })(t, p, d);
    Get(path)(t, p, d);
  };
}
