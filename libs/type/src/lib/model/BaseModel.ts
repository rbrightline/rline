import { Nullable } from '../var/var';
import { ActiveModel } from './ActiveModel';

export type BaseModel = ActiveModel & {
  info: Nullable<string>;
  updatedBy: Nullable<number>;
};
