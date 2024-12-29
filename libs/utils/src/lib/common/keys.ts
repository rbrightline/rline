/**
 * Returns an array of the keys of the given object.
 *
 * @typeParam T - The type of the object.
 * @param obj - The object whose keys are to be returned.
 * @returns An array of the keys of the given object.
 */
export function keys<T extends {}>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}
