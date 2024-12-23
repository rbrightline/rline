import { SetMetadata } from '@nestjs/common';
import { parseResourceName } from './parse-resource-name';

export const OPERATION_NAME_TOKEN = 'OPERATION_NAME_TOKEN';

export function OperationName(operationName: string): MethodDecorator {
  return (t, p, d) => {
    SetMetadata(OPERATION_NAME_TOKEN, operationName)(t, p, d);
  };
}

export function OperationRead(): MethodDecorator {
  return (t, p, d) => {
    OperationName('READ:' + parseResourceName(t.constructor.name).singular)(
      t,
      p,
      d
    );
  };
}
export function OperationWrite(): MethodDecorator {
  return (t, p, d) => {
    OperationName('WRITE:' + parseResourceName(t.constructor.name).singular)(
      t,
      p,
      d
    );
  };
}
export function OperationUpdate(): MethodDecorator {
  return (t, p, d) => {
    OperationName('UPDATE:' + parseResourceName(t.constructor.name).singular)(
      t,
      p,
      d
    );
  };
}
export function OperationDelete(): MethodDecorator {
  return (t, p, d) => {
    OperationName('DELETE:' + parseResourceName(t.constructor.name).singular)(
      t,
      p,
      d
    );
  };
}
export function OperationManage(): MethodDecorator {
  return (t, p, d) => {
    OperationName('MANAGE:' + parseResourceName(t.constructor.name).singular)(
      t,
      p,
      d
    );
  };
}
