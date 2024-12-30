import { UnprocessableEntityException, ValidationError } from '@nestjs/common';
import {
  DeleteOptions,
  DeleteResult,
  UpdateResult,
  WriteService,
} from '@rline/type';
import { keys } from '@rline/utils';
import {
  DeepPartial,
  ObjectLiteral,
  Repository,
  DeleteResult as TypeOrmDeleteResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

/**
 * Service for handling write operations on entities.
 *
 * @template Entity - The type of the entity.
 * @template CreateDto - The type of the DTO used for creating entities.
 * @template UpdateDto - The type of the DTO used for updating entities.
 * @implements {WriteService<Entity, CreateDto, UpdateDto>}
 */
export class EntityWriteService<
  Entity extends ObjectLiteral,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto extends QueryDeepPartialEntity<Entity> = QueryDeepPartialEntity<Entity>
> implements WriteService<Entity, CreateDto, UpdateDto>
{
  constructor(private readonly repo: Repository<Entity>) {}

  protected async _findById(id: number, select: any[]) {
    const [found] = await this.repo.find({
      where: { id },
      select,
      withDeleted: true,
      loadEagerRelations: false,
      loadRelationIds: false,
    } as any);

    return found;
  }

  /**
   * Checks if the given entity has unique values for the properties defined as unique in the repository metadata.
   *
   * @param entity - The entity to be checked for uniqueness.
   * @returns A promise that resolves to `true` if the entity is unique, or throws an `UnprocessableEntityException` if not.
   * @throws UnprocessableEntityException - If the entity violates unique constraints, an exception is thrown with validation errors.
   */
  protected async isUnique(entity: CreateDto): Promise<boolean | never> {
    const uniques = this.repo.metadata.uniques.map((e) =>
      e.columns.map((c) => c.propertyName)
    );

    for (let unique of uniques) {
      const query = unique.reduce((acc, key) => {
        (acc as any)[key] = (entity as any)[key];
        return acc;
      }, {});

      const [found] = await this.repo.find({ where: query, take: 1 });
      if (found) {
        const errors: ValidationError[] = [];
        for (let key of unique) {
          errors.push({
            property: key,
            constraints: {
              unique: `${key} must be unique`,
            },
          });
        }
        throw new UnprocessableEntityException({ errors });
      }
    }

    return true;
  }

  /**
   * Saves the given entity to the repository after ensuring its uniqueness.
   *
   * @param {CreateDto} entity - The entity to be saved.
   * @returns {Promise<Entity>} A promise that resolves to the saved entity.
   * @throws {Error} If the entity is not unique.
   */
  async save(entity: CreateDto): Promise<Entity> {
    await this.isUnique(entity);
    return await this.repo.save(entity);
  }

  async update(id: number, entity: UpdateDto): Promise<UpdateResult> {
    const oldData = await this._findById(id, keys(entity));
    const { raw, affected } = await this.repo.update(id, entity);
    const newData = await this._findById(id, keys(entity));

    return {
      raw,
      affected: affected ?? 0,
      data: [oldData, newData],
    };
  }

  /**
   * Deletes an entity by its ID.
   *
   * @param id - The ID of the entity to delete.
   * @param options - Optional settings for the delete operation.
   * @returns A promise that resolves to the result of the delete operation.
   * @throws An error if the method is not implemented.
   */
  async delete(id: number, options?: DeleteOptions): Promise<DeleteResult> {
    const oldData = await this._findById(id, ['id', 'deletedAt']);
    let result: TypeOrmDeleteResult = { raw: '' };
    let newData: Entity | null = null;

    if (options?.hardDelete) {
      result = await this.repo.delete(id);
    } else {
      result = await this.repo.softDelete(id);
      newData = await this._findById(id, ['id', 'deletedAt']);
    }

    return {
      raw: result.raw,
      affected: result.affected ?? 0,
      data: [oldData, newData],
    };
  }

  /**
   * Restores a previously deleted entity by its ID.
   *
   * @param id - The ID of the entity to restore.
   * @returns A promise that resolves to an UpdateResult object containing:
   *  - `raw`: The raw result returned by the database.
   *  - `affected`: The number of rows affected by the restore operation.
   *  - `data`: An array containing the old data (before restore) and the new data (after restore).
   *
   * @throws Will throw an error if the entity cannot be found or the restore operation fails.
   */
  async restore(id: number): Promise<UpdateResult> {
    const oldData = await this._findById(id, ['id', 'deletedAt']);
    let result: TypeOrmDeleteResult = { raw: '' };
    result = await this.repo.restore(id);
    let newData = await this._findById(id, ['id', 'deletedAt']);
    return {
      raw: result.raw,
      affected: result.affected ?? 0,
      data: [oldData, newData],
    };
  }
}
