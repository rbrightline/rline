import { isOrderString } from './is-order-string';

/**
 * Parses an order string and returns an object representing the order direction for a given property.
 *
 * @template T - The type of the object properties.
 * @param {string} orderString - The order string to parse, formatted as "property::direction".
 * @returns {Record<keyof T, 'ASC' | 'DESC'>} An object where the key is the property and the value is the order direction ('ASC' or 'DESC').
 *
 */
export function parseOrderString<T>(
  orderString: string,
  isValidPRoperty?: (property: string) => boolean
): Record<keyof T, 'ASC' | 'DESC'> | null {
  if (isOrderString(orderString) === false) {
    console.debug(`Invalid order string ${orderString}`);
    return null;
  }

  const [property, direction] = orderString.split('::');

  if (isValidPRoperty && !isValidPRoperty(property)) {
    console.debug(`Invalid property  ${property}`);
    return null;
  }

  return {
    [property]: direction.toUpperCase() as 'ASC' | 'DESC',
  } as Record<keyof T, 'ASC' | 'DESC'>;
}
