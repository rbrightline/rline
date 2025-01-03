import {
  CountOptions,
  CountResult,
  FindOneOptions,
  QueryService,
} from '@rline/type';
import { FindManyOptions, FindOperator, ObjectLiteral } from 'typeorm';
import { FindManyOptionsDto } from '../dto/find-many-options.dto';
import { BaseService } from './base.service';

export class EntityQueryService<Entity extends ObjectLiteral>
  extends BaseService<Entity>
  implements QueryService<Entity, FindOperator<any>, null>
{
  findAll(query: FindManyOptionsDto<Entity>): Promise<Entity[]> {
    this.logger.debug(JSON.stringify(query));

    return this.repo.find({
      ...query,
      loadEagerRelations: !!query.loadEagerRelations,
    } as FindManyOptions<Entity>);
  }

  findOne(query: FindOneOptions): Promise<Entity | null> {
    this.logger.debug(JSON.stringify(query));
    return this.repo.findOne({
      ...query,
      loadEagerRelations: !!query.loadEagerRelations,
    });
  }

  async count<Operator>(
    query: CountOptions<Entity, Operator>
  ): Promise<CountResult> {
    this.logger.debug(JSON.stringify(query));
    const count = await this.repo.count({ ...query } as FindManyOptions);
    return { count };
  }
}
