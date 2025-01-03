import { IDModel } from './id';
import { PermissionModel } from './permission';

export type RoleModelRaw = {
  name: string;
  description: string;
};

export type RoleModelRelations<Permissions> = {
  permissions: Permissions[];
};

export type RoleModel<TPermission = PermissionModel> = IDModel &
  RoleModelRaw &
  RoleModelRelations<TPermission>;

export type CreateRoleModel = RoleModelRaw & RoleModelRelations<IDModel>;

export type UdpateRoleModel = Partial<CreateRoleModel>;
