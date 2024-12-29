/**
 * Options for adding a relation to an entity.
 *
 * @property {number} id - The ID of the entity to which the relation is being added.
 * @property {string} relationName - The name of the relation being added.
 * @property {number} relationId - The ID of the relation being added.
 */
export type AddRelationOptions = {
  id: number;
  relationName: string;
  relationId: number;
};
