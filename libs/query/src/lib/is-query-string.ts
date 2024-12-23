export const QUERY_STRING_EXP =
  /^(eq|cn|sw|ew|neq|ncn|nsw|new)::[0-9\w ]{1,30}$/;

export const QUERY_NUMBER_EXP = /^(eq|mt|lt|lte|mte|neq)::\d{1,30}$/;

/**
 * Check the query string is a valid query string that should pass both `/^(eq|cn|sw|ew|neq|ncn|nsw|new)::[0-9\w ]{1,30}$/ and
 /^(eq|mt|lt|lte|mte|neq)::\d{1,30}$/` regular exprations.
 * @param queryString
 * @returns
 */
export function isQueryString(queryString: string) {
  return (
    (typeof queryString == 'string' && QUERY_STRING_EXP.test(queryString)) ||
    QUERY_NUMBER_EXP.test(queryString)
  );
}
