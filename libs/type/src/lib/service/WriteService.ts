import { DeleteOptions } from '../query/DeleteOptions';
import { DeleteResult } from '../results/DeleteResult';
import { UpdateResult } from '../results/UpdateResult';

/**
 * Interface representing a service for writing operations on entities.
 *
 * @template Entity - The type of the entity.
 */
export interface WriteService<Entity> {
  /**
   * Saves the given entity.
   *
   * @param entity - The entity to save.
   * @returns A promise that resolves to the saved entity.
   */
  save(entity: Entity): Promise<Entity>;

  /**
   * Updates the entity with the given ID.
   *
   * @param id - The ID of the entity to update.
   * @param entity - The updated entity data.
   * @returns A promise that resolves to the result of the update operation.
   */
  update(id: number, entity: Entity): Promise<UpdateResult>;

  /**
   * Deletes the entity with the given ID.
   *
   * @param id - The ID of the entity to delete.
   * @param options - Optional delete options.
   * @returns A promise that resolves to the result of the delete operation.
   */
  delete(id: number, options?: DeleteOptions): Promise<DeleteResult>;

  /**
   * Restores the entity with the given ID.
   *
   * @param id - The ID of the entity to restore.
   * @returns A promise that resolves to the restored entity.
   */
  restore(id: number): Promise<Entity>;
}
