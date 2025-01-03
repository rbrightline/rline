/**
 * Represents a query to find an entity by a specific relation. This is only for x-to-one relations.
 *
 * @property {string} property - The name of the property to query by.
 * @property {string} value - The value of the property to match.
 */
export type FindByRelationOptions = {
  relationId: number;
  relationName: string;
};
