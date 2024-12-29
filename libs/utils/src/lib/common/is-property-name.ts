export const PROPERTY_NAME_EXP = /^[a-z_$]{1,}[0-9a-zA-Z_$]{0,}$/;

/**
 * Checks if the given string is a valid property name.
 *
 * @param name - The string to be tested as a property name.
 * @returns `true` if the string is a valid property name, otherwise `false`.
 */
export function isPropertyName(name: string): boolean {
  return PROPERTY_NAME_EXP.test(name);
}
