import {
  CountOptions,
  CountResult,
  FindManyOptions,
  FindOneOptions,
  QueryService,
} from '@rline/type';
import { FindOperator, ObjectLiteral, Repository } from 'typeorm';

export class EntityQueryService<T extends ObjectLiteral>
  implements QueryService<T, FindOperator<any>>
{
  constructor(protected readonly repo: Repository<T>) {}

  findAll(query: FindManyOptions<T, FindOperator<any>>) {
    const {
      order,
      where,
      loadEagerRelations,
      loadRelationIds,
      select,
      take,
      skip,
      withDeleted,
      relations,
    } = query;
    return this.repo.find({
      take,
      skip,
      withDeleted,
      select,
      order: order as any,
      where: where as any,
      relations,
      loadEagerRelations: loadEagerRelations ?? false,
      loadRelationIds: loadRelationIds ?? false,
    });
  }

  async findOne(query: FindOneOptions) {
    const {
      loadEagerRelations,
      loadRelationIds,
      relations,
      select,
      where,
      withDeleted,
    } = query;

    await this.repo.find({
      relations,
      withDeleted,
      select,
      where,
      loadEagerRelations: loadEagerRelations ?? false,
      loadRelationIds: loadRelationIds ?? false,
    });
  }

  async count<Operator>(
    query: CountOptions<T, Operator>
  ): Promise<CountResult> {
    const { where, withDeleted } = query;
    const count = await this.repo.count({ where: where as any, withDeleted });
    return { count };
  }
}
