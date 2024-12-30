import { normalize } from './normalize';

/**
 * Represents different naming conventions for strings.
 */
export type Names = {
  /**
   * The string in PascalCase format.
   * Example: "PascalCaseExample"
   */
  pascalCase: string;

  /**
   * The string in camelCase format.
   * Example: "camelCaseExample"
   */
  camelCase: string;

  /**
   * The string in kebab-case format.
   * Example: "kebab-case-example"
   */
  kebabCase: string;

  /**
   * The string in snake_case format.
   * Example: "snake_case_example"
   */
  snakeCase: string;

  /**
   * The string in CONSTANT_CASE format.
   * Example: "CONSTANT_CASE_EXAMPLE"
   */
  constCase: string;

  /**
   * The string in Title Case format.
   * Example: "Title Case Example"
   */
  titleCase: string;
};

/**
 * Generates various case formats for a given resource name.
 *
 * @param resourceName - The name of the resource to be transformed into different case formats.
 * @returns An object containing the resource name in different case formats:
 * - `camelCase`: camelCase format.
 * - `constCase`: CONSTANT_CASE format.
 * - `kebabCase`: kebab-case format.
 * - `pascalCase`: PascalCase format.
 * - `snakeCase`: snake_case format.
 * - `titleCase`: Title Case format.
 */
export function names(resourceName: string): Names {
  let value = normalize(resourceName);

  return {
    camelCase: value
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''),
    constCase: value.toUpperCase().replace(/\s/g, '_'),
    kebabCase: value.replace(/\s/g, '-'),
    pascalCase: value
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => word.toUpperCase())
      .replace(/\s+/g, ''),
    snakeCase: value.replace(/\s/g, '_'),
    titleCase: value.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      word.toUpperCase()
    ),
  };
}
