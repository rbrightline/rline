import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to extract the session ID from the request object.
 *
 * This decorator can be used in controller methods to access the session ID
 * directly from the request. It utilizes the `createParamDecorator` function
 * from NestJS to create a parameter decorator.
 *
 * @param data - Additional data passed to the decorator (not used in this implementation).
 * @param ctx - The execution context, which provides access to the request object.
 * @returns The session ID from the request object.
 */
export const SessionId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.session.id;
  }
);
