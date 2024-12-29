import { OrderDir } from './OrderDir';

/**
 * Options for finding entities in the database.
 *
 * @template T - The type of the entity.
 *
 * @property {number} [take] - The maximum number of entities to return.
 * @property {number} [skip] - The number of entities to skip before starting to collect the result set.
 * @property {boolean} [withDeleted] - Whether to include soft-deleted entities in the result set.
 * @property {(keyof T)[]} [select] - An array of keys to select specific fields of the entity.
 * @property {keyof T} [orderBy] - The key by which to order the result set.
 * @property {OrderDir} [orderDir] - The direction in which to order the result set.
 * @property {boolean} [loadEagerRelations] - Whether to load eager relations of the entity.
 * @property {boolean} [loadRelationIds] - Whether to load only the IDs of the relations.
 */
export type FindOptions<T> = {
  take?: number;
  skip?: number;
  withDeleted?: boolean;
  select?: (keyof T)[];
  orderBy?: keyof T;
  orderDir?: OrderDir;
  loadEagerRelations?: boolean;
  loadRelationIds?: boolean;
};
