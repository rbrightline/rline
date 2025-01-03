import { IDModel } from './id';
import { RoleModel } from './role';

export type UserModelRaw = {
  username: string;
  password: string;
  sso: string;
};

export type UserModelRelations<Role> = {
  roles: Role[];
};

export type UserModel<TRole = RoleModel> = IDModel &
  UserModelRaw &
  UserModelRelations<TRole>;

export type CreateUserModel = UserModelRaw & UserModelRelations<IDModel>;

export type UpdateUserModel = Partial<CreateUserModel>;
