/**
 * Normalizes a given string by adding spaces before uppercase letters and capitalizing the first letter.
 * Optionally, a custom pre-input validator function can be provided to validate the input string.
 *
 * @param value - The string to be normalized.
 * @param preInputValidator - An optional function to validate the input string before normalization.
 *                            If not provided, a default validation is applied which checks if the string
 *                            contains only letters, underscores, dollar signs, and spaces.
 * @returns The normalized string with spaces before uppercase letters and the first letter capitalized.
 * @throws {Error} If the input string is invalid according to the provided or default validator.
 */
export function normalize(
  value: string,
  preInputValidator?: (value: string) => boolean
): string | null {
  const isValid = preInputValidator
    ? preInputValidator(value)
    : !!value.match(/^[a-zA-Z_$]{1,}[a-zA-Z0-9_$\-\. ]{1,}$/);

  if (isValid) {
    return value
      .replace(/[_\-\.]{1,}/g, ' ')
      .replace(/ {1,}/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .toLowerCase();
  }

  console.debug(`Invalid input string ${value}`);
  return null;
}
