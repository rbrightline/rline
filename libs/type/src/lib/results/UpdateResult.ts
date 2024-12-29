/**
 * Represents the result of an update operation.
 *
 * @typedef {Object} UpdateResult
 *
 * @property {string} raw - The raw response from the update operation.
 * @property {number} affected - The number of records affected by the update.
 * @property {Array<any>} data - An array containing the data returned by the update operation.
 */
export type UpdateResult = {
  raw: string;
  affected: number;
  data: Array<any>;
};
