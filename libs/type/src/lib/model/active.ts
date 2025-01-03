import { TimestampModel } from './timestamp';

export type ActiveModelRaw = {
  active?: boolean;
};

/**
 * Represents an active model that extends the `TimestampModel` with an additional `active` property.
 *
 * @typedef {TimestampModel} ActiveModel
 *
 * @property {boolean} active - Indicates whether the model is active. Can be null or a boolean value.
 */
export type ActiveModel = TimestampModel & ActiveModelRaw;
