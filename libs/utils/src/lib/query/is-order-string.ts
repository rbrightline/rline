/**
 * Regular expression to validate order strings.
 *
 * The order string must follow the format:
 * - A sequence of 1 to 30 alphabetic characters (case-insensitive)
 * - Followed by "::"
 * - Followed by either "ASC", "DESC", "asc", or "desc"
 *
 * Examples of valid order strings:
 * - "name::ASC"
 * - "age::desc"
 *
 * Examples of invalid order strings:
 * - "name::ascending"
 * - "123::ASC"
 */
export const ORDER_QUERY_STRING_EXP = /^[a-zA-Z]{1,30}::(ASC|DESC|asc|desc)$/;

/**
 * Checks if the given query string matches the order expression pattern.
 *
 * @param query - The query string to be tested.
 * @returns A boolean indicating whether the query string matches the order expression pattern.
 */
export function isOrderString(query: string) {
  return ORDER_QUERY_STRING_EXP.test(query);
}
