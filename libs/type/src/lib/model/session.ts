import { IDModel } from './id';
import { UserModel } from './user';

export type SeesionModelRaw = {
  deviceId: string;
  token: string;
};

export type SessionModelRelations<TUser = UserModel> = {
  user: TUser;
};

export type SessionModel<TUser = UserModel> = IDModel &
  SeesionModelRaw &
  SessionModelRelations<TUser>;

export type CreateSessionModel = SeesionModelRaw & SessionModelRelations;

export type UpdateSessionModel = Partial<CreateSessionModel>;
