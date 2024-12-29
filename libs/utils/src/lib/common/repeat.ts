/**
 * Generates an array by invoking a handler function a specified number of times.
 *
 * @template T - The type of elements in the resulting array.
 * @param {number} count - The number of times to invoke the handler function.
 * @param {(i: number) => T} handler - A function that takes the current index and returns an element of type T.
 * @returns {Array<T>} An array containing the results of invoking the handler function.
 */
export function repeat<T>(count: number, handler: (i: number) => T): Array<T> {
  return Array.from({ length: count }).map((_, i) => handler(i));
}
