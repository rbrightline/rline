export const ORDER_EXP = /^[a-zA-Z]{1,30}::(ASC|DESC|asc|desc|-1|1)$/;

/**
 * Check the query string is an order query string that matches the regular expression `/^[a-zA-Z]{1,30}::(ASC|DESC|asc|desc|-1|1)$/`
 * @param query
 * @returns
 */
export function isOrderString(query: string) {
  return ORDER_EXP.test(query);
}
