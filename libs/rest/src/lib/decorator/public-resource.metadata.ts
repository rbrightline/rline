import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Metadata } from '@rline/type';
import { Reflector } from '@nestjs/core';

export function PublicResource(): MethodDecorator {
  return (t: any, p: any, d: any) => {
    SetMetadata(Metadata.PUBLIC_TOKEN, true)(t, p, d);
  };
}

export function isResourcePublic(
  reflector: Reflector,
  context: ExecutionContext
): boolean {
  return (
    reflector.getAllAndOverride<boolean>(Metadata.PUBLIC_TOKEN, [
      context.getClass(),
      context.getHandler(),
    ]) === true
  );
}
