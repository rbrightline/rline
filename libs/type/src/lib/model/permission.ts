import { OperationName } from '../constant/operation-names';
import { IDModel } from './id';

export type PermissionModelRaw = {
  resource: string;
  operation: OperationName;
};

export type PermissionModelRelations<Permissions> = {
  permissions: Permissions[];
};

export type PermissionModel = IDModel &
  PermissionModelRaw &
  PermissionModelRelations<IDModel>;

export type CreatePermissionModel = PermissionModelRaw &
  PermissionModelRelations<IDModel>;

export type UdpatePermissionModel = Partial<CreatePermissionModel>;
