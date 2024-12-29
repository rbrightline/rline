import { Nullable } from '../var/var';
import { TimestampModel } from './TimestampModel';

/**
 * Represents an active model that extends the `TimestampModel` with an additional `active` property.
 *
 * @typedef {TimestampModel} ActiveModel
 *
 * @property {Nullable<boolean>} active - Indicates whether the model is active. Can be null or a boolean value.
 */
export type ActiveModel = TimestampModel & {
  active: Nullable<boolean>;
};
