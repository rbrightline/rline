import { Nullable } from '../var/var';
import { ActiveModel } from './ActiveModel';

/**
 * Represents the base model which extends the ActiveModel.
 *
 * @typedef {BaseModel} BaseModel
 *
 * @property {Nullable<string>} info - Additional information related to the model.
 * @property {Nullable<number>} updatedBy - Identifier of the user who last updated the model.
 */
export type BaseModel = ActiveModel & {
  info: Nullable<string>;
  updatedBy: Nullable<number>;
};
