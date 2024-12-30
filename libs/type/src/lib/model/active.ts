import { TimestampModel } from './timestamp';

/**
 * Represents an active model that extends the `TimestampModel` with an additional `active` property.
 *
 * @typedef {TimestampModel} ActiveModel
 *
 * @property {boolean} active - Indicates whether the model is active. Can be null or a boolean value.
 */
export type ActiveModel = TimestampModel & {
  active?: boolean;
};
