import { SetMetadata } from '@nestjs/common';

export const OPERATION_NAME_TOKEN = 'OPERATION_NAME_TOKEN';

export function OperationNameMetadata(operationName: string): MethodDecorator {
  return (t, p, d) => {
    SetMetadata(OPERATION_NAME_TOKEN, operationName)(t, p, d);
  };
}

export function OperationRead(): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata('READ')(t, p, d);
  };
}

export function OperationWrite(): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata('WRITE')(t, p, d);
  };
}
export function OperationUpdate(): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata('UPDATE')(t, p, d);
  };
}
export function OperationDelete(): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata('DELETE')(t, p, d);
  };
}
export function OperationManage(): MethodDecorator {
  return (t, p, d) => {
    OperationNameMetadata('MANAGE')(t, p, d);
  };
}
