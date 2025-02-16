/**
 * Pick the required properties of a type
 */
export type PickRequired<T, K extends keyof T> =
  | Required<Pick<T, K>>
  | Omit<T, K>;
