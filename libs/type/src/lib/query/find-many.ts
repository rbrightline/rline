import { Order } from './order';
import { WhereOptions } from './where';

/**
 * Options for finding entities in the database.
 *
 * @generic Entity - The type of the entity.
 * @generic FindOperator - The type of the find operator such as typeorm FindOperator.
 *
 * @property {number} [take] - The maximum number of entities to return.
 * @property {number} [skip] - The number of entities to skip before starting to collect the result set.
 * @property {boolean} [withDeleted] - Whether to include soft-deleted entities in the result set.
 * @property {(keyof T)[]} [select] - An array of keys to select specific fields of the entity.
 * @property {keyof T} [orderBy] - The key by which to order the result set.
 * @property {OrderDir} [orderDir] - The direction in which to order the result set.
 * @property {string[]} [relations] - The relations to load with the entity.
 * @property {boolean} [loadEagerRelations] - Whether to load eager relations of the entity.
 * @property {boolean} [loadRelationIds] - Whether to load only the IDs of the relations.
 */
export type FindManyOptions<Entity, FindOperator> = {
  take?: number;
  skip?: number;
  withDeleted?: boolean;
  select?: (keyof Entity)[];
  order?: Order<Entity>;
  where?: WhereOptions<Entity, FindOperator>;
  relations?: string[];
  loadEagerRelations?: boolean;
  loadRelationIds?: boolean;
};
