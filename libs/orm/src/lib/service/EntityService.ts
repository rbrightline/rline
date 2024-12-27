import {
  Equal,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DecrementDto, IncrementDto } from '../dto/IncrementDto';
import { SetRelationDto, UnsetRelationDto } from '../dto/RelationDo';
import { NotFoundException, Type } from '@nestjs/common';
import { DeleteResult, UpdateResult } from '@rline/type';
import { MessageDto } from '../dto/MessageDto';
import { CountDto } from '../dto/CountDto';

export class EntityService<T extends {}> {
  constructor(protected readonly repo: Repository<T>) {}

  async find(
    query?: FindManyOptions<any>,
    where?: FindOptionsWhere<any>
  ): Promise<T[]> {
    return await this.repo.find({
      ...query,
      where,
      loadRelationIds: query?.loadRelationIds == true,
      loadEagerRelations: query?.loadEagerRelations == true,
    } as any);
  }

  async findOneById(id: number, query?: FindOneOptions<any>) {
    const found = await this.repo.findOne({
      ...query,
      where: { id: Equal(id) },
    } as any);

    if (found) return found;

    throw new NotFoundException({
      message: `There is no entity matching with the query ${id}!`,
    });
  }

  async save(entity: T) {
    return await this.repo.save(entity);
  }

  async update(
    id: number,
    entity: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    const keys = Object.keys(entity);

    const oldData = await this.findOneById(id, { select: keys });
    const result = await this.repo.update(id, entity);
    const newData = await this.findOneById(id, { select: keys });

    return {
      raw: result.raw,
      data: [oldData, newData],
      affected: result.affected!,
    };
  }

  async softDelete(id: number): Promise<DeleteResult> {
    const oldData = await this.findOneById(id, { select: ['id', 'deletedAt'] });
    const result = await this.repo.softDelete(id);
    const newData = await this.findOneById(id, {
      select: ['id', 'deletedAt'],
      withDeleted: true,
    });

    return {
      raw: result.raw,
      affected: result.affected!,
      data: [oldData, newData],
    };
  }

  async delete(id: number) {
    const oldData = await this.findOneById(id, { select: ['id', 'deletedAt'] });
    const result = await this.repo.delete(id);

    return {
      raw: result.raw,
      affected: result.affected!,
      data: [oldData],
    };
  }

  async addRelation(relation: SetRelationDto): Promise<MessageDto> {
    const { id, rid, rn } = relation;
    await this.repo.createQueryBuilder().relation(rn!).of(id).add(rid);

    return { message: 'done' };
  }

  async removeRelation(relation: SetRelationDto): Promise<MessageDto> {
    const { id, rid, rn } = relation;
    await this.repo.createQueryBuilder().relation(rn!).of(id).remove(rid);

    return { message: 'done' };
  }

  async setRelation(relation: SetRelationDto): Promise<MessageDto> {
    const { id, rid, rn } = relation;
    await this.repo.createQueryBuilder().relation(rn!).of(id).set(rid);
    return { message: 'done' };
  }

  async unsetRelation(relation: UnsetRelationDto): Promise<MessageDto> {
    const { id, rn } = relation;
    await this.repo.createQueryBuilder().relation(rn!).of(id).set(null);
    return { message: 'done' };
  }

  async count(query: FindManyOptions<T>): Promise<CountDto> {
    const count = await this.repo.count(query);
    return { count };
  }

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
}
