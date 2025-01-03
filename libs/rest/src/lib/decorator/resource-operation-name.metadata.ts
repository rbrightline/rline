import { SetMetadata, ExecutionContext } from '@nestjs/common';
import { Metadata, OperationName } from '@rline/type';
import { Reflector } from '@nestjs/core';

export function ResourceOperationName(
  operationname: OperationName
): MethodDecorator {
  return (t: any, p: any, d: any) => {
    SetMetadata(Metadata.OPERATION_NAME_TOKEN, operationname)(t, p, d);
  };
}

export function getOperationName(
  reflector: Reflector,
  context: ExecutionContext
): string {
  return reflector.getAllAndOverride<string>(Metadata.OPERATION_NAME_TOKEN, [
    context.getClass(),
    context.getHandler(),
  ]);
}
