import { IDModel } from './id';
import { RoleModel } from './role';

export type UserModelRaw = {
  /**
   * The user's username
   */
  username: string;

  /**
   * The user's password
   */
  password: string;

  /**
   * The user's SSO token
   */
  sso: string;

  /**
   * The user's pin
   */
  pin: string;

  /**
   * The user's email
   */
  verified: boolean;
};

export type UserModelRelations<Role> = {
  /**
   * The user's roles
   */
  roles: Role[];
};

export type UserModel<TRole = RoleModel> = IDModel &
  UserModelRaw &
  UserModelRelations<TRole>;

export type CreateUserModel = UserModelRaw & UserModelRelations<IDModel>;

export type UpdateUserModel = Partial<CreateUserModel>;
