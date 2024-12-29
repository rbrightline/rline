/**
 * Represents the result of a delete operation.
 *
 * @typedef {Object} DeleteResult
 *
 * @property {string} raw - The raw response from the delete operation.
 * @property {number} affected - The number of records affected by the delete operation.
 * @property {any[]} data - Additional data related to the delete operation.
 */
export type DeleteResult = {
  raw: string;
  affected: number;
  data: Array<any>;
};
