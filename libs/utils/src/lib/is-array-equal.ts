/**
 * Compares two arrays for equality.
 *
 * @param arr0 - The first array to compare.
 * @param arr1 - The second array to compare.
 * @returns `true` if both arrays have the same length and all corresponding elements are equal, otherwise `false`.
 */
export function isArrayEqual(arr0: any[], arr1: any[]): boolean {
  if (arr0.length !== arr1.length) {
    return false;
  }

  for (let i = 0; i < arr0.length; i++) {
    if (arr0[i] !== arr1[i]) {
      return false;
    }
  }

  return true;
}
