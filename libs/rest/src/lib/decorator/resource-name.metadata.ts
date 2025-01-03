import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Metadata } from '@rline/type';

export function ResourceName(resourceName: string): ClassDecorator {
  return (t: any) => {
    SetMetadata(Metadata.RESOURCE_NAME_TOKEN, resourceName)(t);
  };
}

export function getResourceName(
  reflector: Reflector,
  context: ExecutionContext
): string {
  return reflector.getAllAndOverride<string>(Metadata.RESOURCE_NAME_TOKEN, [
    context.getClass(),
    context.getHandler(),
  ]);
}
