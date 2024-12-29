export const QUERY_STRING_EXP =
  /^([a-z_$]{1,}[a-zA-Z_$]{0,})::(eq|cn|sw|ew|neq|ncn|nsw|new)::[0-9\w]{1,30}$/;

export const QUERY_NUMBER_EXP =
  /^([a-z_$]{1,}[a-zA-Z_$]{0,})::(eq|mt|lt|mte|lte|neq)::\d{1,30}$/;

/**
 * Checks if the provided string is a valid query string.
 *
 * A valid query string is either:
 * - A string that matches the `QUERY_STRING_EXP` regular expression.
 * - A string that matches the `QUERY_NUMBER_EXP` regular expression.
 *
 * @param queryString - The string to be checked.
 * @returns `true` if the string is a valid query string, otherwise `false`.
 */
export function isQueryString(queryString: string) {
  return (
    (typeof queryString == 'string' && QUERY_STRING_EXP.test(queryString)) ||
    QUERY_NUMBER_EXP.test(queryString)
  );
}
