/**
 * Represents a query to find an entity by a specific relation.
 * 
 * @property {string} property - The name of the property to query by.
 * @property {string} value - The value of the property to match.
 */
export type FindByRelation = {
  property: string;
  value: string;
};
