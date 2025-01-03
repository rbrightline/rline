/**
 * Custom decorator to extract the user ID from the request object.
 * 
 * This decorator can be used in a controller method to automatically
 * retrieve the user ID from the request object, assuming that the
 * user information is attached to the request.
 * 
 * @param data - Additional data passed to the decorator (not used).
 * @param ctx - The execution context, which provides access to the request object.
 * @returns The user ID extracted from the request object.
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.id;
  }
);
