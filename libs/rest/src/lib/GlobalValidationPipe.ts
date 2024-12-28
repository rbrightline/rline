import {
  Type,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

export const GlobalValidationPipe: ValidationPipe = new ValidationPipe({
  transform: true,
  transformOptions: {
    exposeUnsetFields: false,
    exposeDefaultValues: false,
  },
  exceptionFactory(errors) {
    throw new UnprocessableEntityException({ errors });
  },
});

export function GlobalValidationPipeWithType(type: Type): ValidationPipe {
  return new ValidationPipe({
    expectedType: type,
    transform: true,
    transformOptions: {
      exposeUnsetFields: false,
      exposeDefaultValues: false,
      excludeExtraneousValues: true,
    },
    exceptionFactory(errors) {
      throw new UnprocessableEntityException({ errors });
    },
  });
}
