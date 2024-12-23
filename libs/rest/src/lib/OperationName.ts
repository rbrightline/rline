import { SetMetadata } from '@nestjs/common';
import { OperationName } from '@rline/type';
export const OPERATION_NAME_TOKEN = 'OPERATION_NAME_TOKEN';

export function operationName(operation: OperationName, resouce: string) {
  return `${operation}:${resouce}`;
}

export function OperationNameMetadata(operationName: string): MethodDecorator {
  return (t, p, d) => {
    SetMetadata(OPERATION_NAME_TOKEN, operationName)(t, p, d);
  };
}

export function OperationRead(resourceName: string): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata(operationName(OperationName.READ, resourceName))(
      t,
      p,
      d
    );
  };
}
export function OperationWrite(resourceName: string): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata(operationName(OperationName.WRITE, resourceName))(
      t,
      p,
      d
    );
  };
}
export function OperationUpdate(resourceName: string): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata(operationName(OperationName.UPDATE, resourceName))(
      t,
      p,
      d
    );
  };
}
export function OperationDelete(resourceName: string): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata(operationName(OperationName.DELETE, resourceName))(
      t,
      p,
      d
    );
  };
}
export function OperationManage(resourceName: string): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata(operationName(OperationName.MANAGE, resourceName))(
      t,
      p,
      d
    );
  };
}
