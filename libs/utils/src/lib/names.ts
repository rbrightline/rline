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
 * @param resourceName - The name of the resource to be converted into different case formats.
 * @returns An object containing the resource name in different case formats:
 * - `camelCase`: The resource name in camelCase format.
 * - `constCase`: The resource name in CONSTANT_CASE format.
 * - `kebabCase`: The resource name in kebab-case format.
 * - `pascalCase`: The resource name in PascalCase format.
 * - `snakeCase`: The resource name in snake_case format.
 * - `titleCase`: The resource name in Title Case format.
 *
 * @example
 * ```typescript
 * const nameFormats = names("Example Resource");
 * console.log(nameFormats.camelCase); // "exampleResource"
 * console.log(nameFormats.constCase); // "EXAMPLE_RESOURCE"
 * console.log(nameFormats.kebabCase); // "example-resource"
 * console.log(nameFormats.pascalCase); // "ExampleResource"
 * console.log(nameFormats.snakeCase); // "example_resource"
 * console.log(nameFormats.titleCase); // "Example Resource"
 * ```
 */
export function names(resourceName: string): Names {
  let value = normalize(resourceName);
  return {
    camelCase: value
      .toLowerCase() // Convert the entire string to lowercase
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      ) // Capitalize the first letter of every word except the first
      .replace(/\s+/g, ''),
    constCase: value.toUpperCase().replace(/\s/g, '_'),
    kebabCase: value.toLowerCase().replace(/\s/g, '-'),
    pascalCase: value.replace(/\s/g, ''),
    snakeCase: value.toLowerCase().replace(/\s/g, '_'),
    titleCase: value,
  };
}
