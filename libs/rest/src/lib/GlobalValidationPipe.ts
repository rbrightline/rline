import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

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
