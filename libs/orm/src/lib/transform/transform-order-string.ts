/**
 * A property decorator that transforms a string into an order object using the `parseOrderString` function.
 *
 * @param isValidPRoperty - An optional handler to validate the parsed order string.
 * @returns A property decorator function.
 *
 * @template T - The type of the order object.
 *
 * @example
 * ```typescript
 * class Example {
 *   @OrderStringTransform()
 *   order: string;
 * }
 * ```
 */
import { Transform } from 'class-transformer';
import { parseOrderString, IsValidHandler } from '@rline/utils';

export function TransformOrderString<T>(
  isValidPRoperty?: IsValidHandler
): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => parseOrderString<T>(value, isValidPRoperty))(t, p);
  };
}
