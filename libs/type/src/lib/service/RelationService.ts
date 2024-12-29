import { AddRelationOptions } from '../query/AddRelationOptions';
import { CountByRelationOptions } from '../query/CountByRelationOptions';
import { FindByRelationOptions } from '../query/FindByRelation';
import { FindManyOptions } from '../query/FindManyOptions';
import { RemoveRelationOptions } from '../query/RemoveRelationOptions';
import { SetRelationOptions } from '../query/SetRelationOptions';
import { UnsetRelationOptions } from '../query/UnsetRelationOptions';
import { CountResult } from '../results/CountResult';
import { UpdateResult } from '../results/UpdateResult';

/**
 * Interface representing a service for managing relations between entities.
 *
 * @template Entity - The type of the entity.
 * @template FindOperator - The type of the FindOprator.
 */
export interface RelationService<Entity, FindOperator> {
  /**
   * Adds a relation based on the provided options.
   * @param params {@link AddRelationOptions} - The options for adding the relation.
   * @returns A promise that resolves to the result of the update operation.
   */
  addRelation(params: AddRelationOptions): Promise<UpdateResult>;

  /**
   * Removes a relation based on the provided options.
   * @param params  {@link RemoveRelationOptions}- The options for removing the relation.
   * @returns A promise that resolves to the result of the update operation.
   */
  removeRelation(params: RemoveRelationOptions): Promise<UpdateResult>;

  /**
   * Sets a relation based on the provided options.
   * @param params {@link SetRelationOptions} - The options for setting the relation.
   * @returns A promise that resolves to the result of the update operation.
   */
  setRelation(params: SetRelationOptions): Promise<UpdateResult>;

  /**
   * Unsets a relation based on the provided options.
   * @param params {@link UnsetRelationOptions} - The options for unsetting the relation.
   * @returns A promise that resolves to the result of the update operation.
   */
  unsetRelation(params: UnsetRelationOptions): Promise<UpdateResult>;

  /**
   * Counts the number of relations based on the provided options.
   * @param params {@link CountByRelationOptions} - The options for counting the relations.
   * @returns A promise that resolves to the result of the count operation.
   */
  countByRelation(params: CountByRelationOptions): Promise<CountResult>;

  /**
   * Finds entities by a specific relation.
   * @param params {@link FindByRelationOptions} - The options for finding entities by relation.
   * @param query {@link FindManyOptions} - The options for finding entities.
   */
  findByRelation(
    params: FindByRelationOptions,
    query: FindManyOptions<Entity, FindOperator>
  ): Promise<Entity[]>;
}
