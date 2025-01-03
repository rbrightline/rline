import { ActiveModel } from './active';
import { IDModel } from './id';
import { PermissionModel } from './permission';

export type AccessTokenRaw = {
  name: string;
};

export type AccessTokenRelations<TPermission> = {
  permissions: TPermission[];
};

export type AccessTokenModel<TPermission = PermissionModel> = ActiveModel &
  AccessTokenRaw &
  AccessTokenRelations<TPermission>;

export type CreateAccessToken = AccessTokenRaw & AccessTokenRelations<IDModel>;
