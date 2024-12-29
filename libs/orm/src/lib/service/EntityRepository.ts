import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Data, Property } from '@rline/property';
import {
  DeepPartial,
  Equal,
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

@Data()
export class FindOneQueryDto<T>
  implements
    Pick<
      FindOneOptions<T>,
      'withDeleted' | 'loadEagerRelations' | 'loadRelationIds' | 'select'
    >
{
  @Property({ type: 'array', items: { type: 'string' } })
  select?: FindOptionsSelect<T> | FindOptionsSelectByString<T> | undefined;

  @Property({ type: 'boolean', default: false })
  loadEagerRelations?: boolean;

  @Property({ type: 'boolean', default: false })
  loadRelationIds?: boolean;

  @Property({ type: 'boolean', default: false })
  withDeleted?: boolean | undefined;
}

export class EntityRepository<T extends ObjectLiteral> {
  constructor(protected readonly repo: Repository<T>) {}

  async save(entity: DeepPartial<T>) {
    try {
      return await this.repo.save(entity);
    } catch (error) {
      throw new BadRequestException({ error });
    }
  }

  async findOne(
    where: FindOptionsWhere<T>,
    query: FindOneQueryDto<T>
  ): Promise<T> {
    const found = await this.repo.findOne({ ...query, where });
    if (found) return found;
    throw new NotFoundException(`Entity with the query ${where} not found!`);
  }

  async findOneById(id: number, query: FindOneQueryDto<T>): Promise<T> {
    return this.findOne({ id: Equal(id) } as any, query);
  }
}
