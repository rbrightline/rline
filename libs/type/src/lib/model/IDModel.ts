/**
 * Represents a model with an optional numeric ID.
 *
 * @typedef {Object} IDModel
 * @property {Nullable<number>} id - The optional numeric ID of the model.
 */
import { Nullable } from '../var/var';

export type IDModel = {
  id: Nullable<number>;
};
