import { IDModel } from './id';

/**
 * Represents the timestamp model which extends the ID model.
 * This model includes timestamps for creation, update, and deletion.
 */
export type TimestampModel = IDModel & {
  /**
   * The date and time when the entity was created.
   * This can be null if the entity has not been created yet.
   */
  createdAt?: Date;

  /**
   * The date and time when the entity was last updated.
   * This can be null if the entity has not been updated yet.
   */
  updatedAt?: Date;

  /**
   * The date and time when the entity was deleted.
   * This can be null if the entity has not been deleted yet.
   */
  deletedAt?: Date;
};
