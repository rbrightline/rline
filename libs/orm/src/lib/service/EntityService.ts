import {
  DeepPartial,
  Equal,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DecrementDto, IncrementDto } from '../query/IncrementDto';
import {
  AddRelationDto,
  RemoveRelationDto,
  SetRelationDto,
  UnsetRelationDto,
} from '../query/RelationDo';
import { NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from '@rline/type';
import { MessageDto } from '../result/MessageDto';
import { CountResultDto } from '../result/CountResultDto';
import { FindByRelationIdDto } from '../query/FindByRelationIdDto';
import { FindByRelationValueDto } from '../query/FindByRelationValueDto';

export class EntityService<
  T extends {},
  CreateDto = DeepPartial<T>,
  UpdateDto = QueryDeepPartialEntity<T>
> {
  constructor(public readonly repo: Repository<T>) {}

  /**
   * Find all by query
   * @param query {@link FindManyOptions}
   * @returns
   */
  async find(query?: FindManyOptions<T>): Promise<T[]> {
    return await this.repo.find({
      ...query,
      loadRelationIds: query?.loadRelationIds == true,
      loadEagerRelations: query?.loadEagerRelations == true,
    } as any);
  }

  /**
   * Find entity by id
   * @param id {@link number}
   * @param query {@link FindOneOptions}
   * @returns
   */
  async findOneById(id: number, query?: FindManyOptions<any>) {
    const founds = await this.repo.find({
      where: { id: Equal(id) } as any,
    } as FindManyOptions<T>);
    if (founds && founds.length > 0) {
      return founds[0];
    }
    throw new NotFoundException(`There is not entity matching ${id}!`);
  }

  /**
   * Save entity
   * @param entity {@link T}
   * @returns
   */
  async save(entity: DeepPartial<CreateDto>) {
    return await this.repo.save(entity as DeepPartial<T>);
  }

  /**
   * Update entity by id and partial entity
   * @param id {@link number}
   * @param entity {@link T}
   * @returns
   */
  async update(
    id: number,
    entity: QueryDeepPartialEntity<UpdateDto>
  ): Promise<UpdateResult> {
    entity as QueryDeepPartialEntity<T>;

    const keys = Object.keys(entity as QueryDeepPartialEntity<T>);
    const selectOptions: FindManyOptions<any> = { select: keys };

    const oldData = await this.findOneById(id, selectOptions);
    const result = await this.repo.update(
      id,
      entity as QueryDeepPartialEntity<T>
    );
    const newData = await this.findOneById(id, selectOptions);

    return {
      raw: result.raw,
      data: [oldData, newData],
      affected: result.affected!,
    };
  }

  /**
   * Delete realtion by id (soft delete)
   * @param id {@link number}
   * @returns
   */
  async softDelete(id: number): Promise<DeleteResult> {
    const selectOptions: FindManyOptions<any> = { select: ['id', 'deletedAt'] };
    const oldData = await this.findOneById(id, selectOptions);
    const result = await this.repo.softDelete(id);
    const newData = await this.findOneById(id, {
      ...selectOptions,
      withDeleted: true,
      loadEagerRelations: false,
      loadRelationIds: false,
    });

    return {
      raw: result.raw,
      affected: result.affected!,
      data: [oldData, newData],
    };
  }

  /**
   * Delete relation by id (hard delete)
   * @param id {@link number}
   * @returns
   */
  async delete(id: number) {
    const oldData = await this.findOneById(id, {
      select: ['id', 'deletedAt'],
      withDeleted: true,
    });

    const result = await this.repo.delete(id);

    return {
      raw: result.raw,
      affected: result.affected!,
      data: [oldData],
    };
  }

  /**
   * Find entities by relation query such as `category.name`, `category.id`
   * @param query {@link FindByRelationValueDto}
   * @returns
   */
  async findByRelation(query: FindByRelationValueDto) {
    const { key, rn, value } = query;
    return this.repo
      .createQueryBuilder('m')
      .leftJoin(`m.${rn}`, rn!)
      .where(`${rn}.${key}= :value`, { value })
      .select(['m.id', `${rn}.id`])
      .getMany();
  }

  /**
   * Find by relation id
   * @param query {@link FindByRelationValueDto}
   * @returns
   */
  async findByRelationId(query: FindByRelationIdDto): Promise<T[]> {
    const { rid, rn } = query;
    return await this.findByRelation({
      key: 'id',
      value: rid + '',
      rn,
    });
  }

  /**
   * Add relation (one-to-many or many-to-many relations only)
   * @param relation {@link AddRelationDto}
   * @returns
   */
  async addRelation(relation: AddRelationDto): Promise<MessageDto> {
    const { id, rid, rn } = relation;
    await this.repo.createQueryBuilder().relation(rn!).of(id).add(rid);

    return { message: 'done' };
  }

  /**
   * Remove relation (one-to-many or many-to-many relations only)
   * @param relation
   * @returns
   */
  async removeRelation(relation: RemoveRelationDto): Promise<MessageDto> {
    const { id, rid, rn } = relation;
    await this.repo.createQueryBuilder().relation(rn!).of(id).remove(rid);

    return { message: 'done' };
  }

  /**
   * Set relation (one-to-one or many-to-one relations only)
   * @param relation {@link SetRelationDto}
   * @returns
   */
  async setRelation(relation: SetRelationDto): Promise<MessageDto> {
    const { id, rid, rn } = relation;
    await this.repo.createQueryBuilder().relation(rn!).of(id).set(rid);
    return { message: 'done' };
  }

  /**
   * Unset relation (one-to-one or many-to-one relations only)
   * @param relation {@link UnsetRelationDto}
   * @returns
   */
  async unsetRelation(relation: UnsetRelationDto): Promise<MessageDto> {
    const { id, rn } = relation;
    await this.repo.createQueryBuilder().relation(rn!).of(id).set(null);
    return { message: 'done' };
  }

  /**
   * Count entities by query
   * @param query {@link FindManyOptions}
   * @returns
   */
  async count(query: FindManyOptions<T>): Promise<CountResultDto> {
    console.log(query);
    const count = await this.repo.count(query);
    return { count };
  }

  /**
   * Increment property value by key and value
   * @param id {@link number} entity id
   * @param increment {@link IncrementDto}
   * @returns
   */
  async increment(id: number, increment: IncrementDto): Promise<UpdateResult> {
    const { property, value } = increment;
    const oldData = await this.findOneById(id, { select: [property!] });
    const result = await this.repo.increment({ id } as any, property!, value!);
    const newData = await this.findOneById(id, { select: [property!] });

    if (result.affected && result.affected > 0) {
      return {
        raw: result.raw,
        affected: result.affected ?? null,
        data: [oldData, newData],
      };
    }

    throw new NotFoundException({
      message: `There is no entity matching with the query ${id}!`,
    });
  }

  /**
   * Decrement property value by key and value
   * @param id {@link number} entity id
   * @param increment {@link DecrementDto}
   * @returns
   */
  async decrement(id: number, decrement: DecrementDto) {
    const { property, value } = decrement;
    const oldData = await this.findOneById(id, { select: [property!] });
    const result = await this.repo.decrement({ id } as any, property!, value!);
    const newData = await this.findOneById(id, { select: [property!] });

    if (result.affected && result.affected > 0) {
      return {
        raw: result.raw,
        affected: result.affected ?? null,
        data: [oldData, newData],
      };
    }

    throw new NotFoundException({
      message: `There is no entity matching with the query ${id}!`,
    });
  }

  createQueryBuilder(alias: string) {
    return this.repo.createQueryBuilder(alias);
  }
}
