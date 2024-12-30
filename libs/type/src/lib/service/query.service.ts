import { CountOptions } from '../query/count';
import { FindManyOptions } from '../query/find-many';
import { FindOneOptions } from '../query/find-one';
import { CountResult } from '../results/count';

/**
 * Interface representing a service for querying entities.
 *
 * @template Entity - The type of the entity.
 * @template FindOperator - The type of the find operator.
 */
export interface QueryService<Entity, FindOperator, Nullvalue = undefined> {
  /**
   * Finds all entities matching the given query options.
   *
   * @param query - The options for finding multiple entities.
   * @returns A promise that resolves to the found entities.
   */
  findAll(query: FindManyOptions<Entity, FindOperator>): Promise<Entity[]>;

  /**
   * Finds a single entity matching the given query options.
   *
   * @param query - The options for finding a single entity.
   * @returns A promise that resolves to the found entity.
   */
  findOne(query: FindOneOptions): Promise<Entity | Nullvalue>;

  /**
   * Counts the number of entities matching the given query options.
   *
   * @template Operator - The type of the count operator.
   * @param query - The options for counting entities.
   * @returns A promise that resolves to the count result.
   */
  count<Operator>(query: CountOptions<Entity, Operator>): Promise<CountResult>;
}
