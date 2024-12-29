import { names } from './names';
import { pluralize } from './pluralize';

/**
 * Represents the paths used in REST API endpoints.
 */
export type RestApiPaths = {
  /**
   * The plural form of the resource path.
   * Typically used to represent a collection of resources.
   * Example: `/users`
   */
  plural: string;

  /**
   * The singular form of the resource path.
   * Typically used to represent a single resource.
   * Example: `/user`
   */
  singular: string;

  /**
   * The path parameter representing the unique identifier of a resource.
   * Example: `/user/:id`
   */
  id: string;

  /**
   * The path used to add a new resource.
   * Example: `/user/plus`
   */
  plus: string;

  /**
   * The path used to get the count of resources.
   * Example: `/users/count`
   */
  count: string;

  /**
   * The path used to represent a relation between resources.
   * Example: `/user/:id/relation`
   */
  relation: string;

  /**
   * The path parameter representing the unique identifier of a related resource.
   * Example: `/user/:id/relation/:relationId`
   */
  relationId: string;
};

/**
 * Generates REST API paths for a given resource name with an optional prefix.
 *
 * @param name - The name of the resource for which to generate paths.
 * @param prefix - An optional prefix to prepend to each path. Defaults to an empty string.
 * @returns An object containing various REST API paths for the resource.
 *
 * @property plural - The plural form of the resource path.
 * @property singular - The singular form of the resource path.
 * @property id - The path for accessing a specific resource by its ID.
 * @property plus - The path for accessing a specific resource by its ID with an additional 'plus' segment.
 * @property count - The path for accessing the count of the resources.
 * @property relation - The path for accessing a relation of a specific resource by its ID.
 * @property relationId - The path for accessing a specific relation of a specific resource by its ID and the relation's ID.
 */
export function restPaths(name: string, prefix = ''): RestApiPaths {
  const pf = prefix ? `${prefix}/` : '';
  const singularName = names(name).kebabCase;
  const pluralName = pluralize(singularName);
  const singularPath = `${pf}${singularName}`;
  const pluralPath = `${pf}${pluralName}`;
  const idPath = `${singularPath}/:id`;

  return {
    plural: pluralPath,
    singular: singularPath,
    id: `${idPath}`,
    plus: `${idPath}/plus`,
    count: `${pluralPath}/count`,
    relation: `${idPath}/:relation`,
    relationId: `${idPath}/:relation/:relationId`,
  };
}
