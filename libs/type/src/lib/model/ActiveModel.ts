import { Nullable } from '../var/var';
import { TimestampModel } from './TimestampModel';

export type ActiveModel = TimestampModel & {
  active: Nullable<boolean>;
};
