/**
 * Excludes properties with `undefined` and `null` values from an object.
 *
 * @template T - The type of the values in the object.
 * @param {Record<string, T>} obj - The object from which to exclude `undefined` and `null` values.
 * @returns {Record<string, T>} A new object with all properties that have `undefined` values removed.
 */
export function definedOnly<T>(obj: Record<string, T>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != undefined)
  );
}
