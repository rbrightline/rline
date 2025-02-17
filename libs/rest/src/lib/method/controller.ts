import { Controller as NestController } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/**
 * Controller decorator
 * @returns
 */
export function Controller(): ClassDecorator {
  return (t) => {
    NestController()(t);
    ApiBearerAuth()(t);
    ApiTags(t.constructor.name)(t);
  };
}
