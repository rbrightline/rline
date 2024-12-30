import { CountResult, NULL_DATE, QueryService } from '@rline/type';
import {
  FindManyOptions,
  FindOperator,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { FindManyOptionsDto } from '../dto/FindManyOptionsDto';
import { Logger } from '@nestjs/common';
import { FindOneOptionsDto } from '../dto/FindOneOptionsDto';
import { CountOptionsDto } from '../dto/CountOptionsDto';

export class EntityQueryService<Entity extends ObjectLiteral>
  implements QueryService<Entity, FindOperator<any>>
{
  protected readonly logger: Logger;
  constructor(protected readonly repo: Repository<Entity>) {
    this.logger = new Logger(repo.metadata.targetName + 'QueryService');
  }

  findAll(query: FindManyOptionsDto<Entity>): Promise<Entity[]> {
    this.logger.debug(JSON.stringify(query));
    return this.repo.find({ ...query } as FindManyOptions<Entity>);
  }

  findOne(query: FindOneOptionsDto): Promise<NULL_DATE<Entity>> {
    this.logger.debug(JSON.stringify(query));
    return this.repo.findOne(query);
  }

  async count(query: CountOptionsDto<Entity>): Promise<CountResult> {
    this.logger.debug(JSON.stringify(query));
    const count = await this.repo.count({ ...query });
    return { count };
  }
}
