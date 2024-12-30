/**
 * Represents an order specification for sorting.
 * 
 * @template T - The type of the object to be ordered.
 * 
 * @typedef {Object} Order
 * @property {OrderDir} [key] - The direction of the order for each key in the object.
 */
import { OrderDir } from './order-dir';

export type Order<T> = {
  [key in keyof T]?: OrderDir;
};
