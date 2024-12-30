import {
  CountOptions,
  CountResult,
  FindOneOptions,
  QueryService,
} from '@rline/type';
import {
  FindManyOptions,
  FindOperator,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { FindManyOptionsDto } from '../dto/find-many';
import { Logger } from '@nestjs/common';

export class EntityQueryService<Entity extends ObjectLiteral>
  implements QueryService<Entity, FindOperator<any>, null>
{
  protected readonly logger: Logger;
  constructor(protected readonly repo: Repository<Entity>) {
    this.logger = new Logger(repo.metadata.targetName + 'QueryService');
  }

  findAll(query: FindManyOptionsDto<Entity>): Promise<Entity[]> {
    this.logger.debug(JSON.stringify(query));
    return this.repo.find({ ...query } as FindManyOptions<Entity>);
  }

  findOne(query: FindOneOptions): Promise<Entity | null> {
    this.logger.debug(JSON.stringify(query));
    return this.repo.findOne(query);
  }

  async count<Operator>(
    query: CountOptions<Entity, Operator>
  ): Promise<CountResult> {
    this.logger.debug(JSON.stringify(query));
    const count = await this.repo.count({ ...query } as any);
    return { count };
  }
}
