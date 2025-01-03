import { ActiveModel } from './active';

export type BaseModelRaw = {
  info?: string;
  updatedBy?: number;
};

/**
 * Represents the base model which extends the ActiveModel.
 *
 * @typedef {BaseModel} BaseModel
 *
 * @property {string} info - Additional information related to the model.
 * @property {number} updatedBy - Identifier of the user who last updated the model.
 */
export type BaseModel = ActiveModel & BaseModelRaw;
