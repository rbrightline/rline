/**
 * Normalizes a given string by adding a space before uppercase letters
 * and capitalizing the first letter of the string.
 *
 * @param value - The string to be normalized. It must contain at least one letter.
 * @returns The normalized string with spaces before uppercase letters and the first letter capitalized.
 * @throws {Error} If the input string does not contain at least one letter.
 */
export function normalize(value: string) {
  const isValid = /^[a-zA-Z]{1,}$/.test(value);
  if (isValid) {
    return value
      .replace(
        /([a-z])([A-Z])/g,
        '$1 $2'
      ) /* Add a space before uppercase letters */
      .replace(/^./, (char: string) =>
        char.toUpperCase()
      ); /* Capitalize the first letter */
  }
  throw new Error('Invalid input: value must contain at least one letter');
}
