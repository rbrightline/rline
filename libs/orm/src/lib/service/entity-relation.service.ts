import { RelationService } from '@rline/type';
import { FindOperator, ObjectLiteral } from 'typeorm';
import { BaseService } from './base.service';
import { FindByRelationOptionsDto } from '../dto/find-by-relation-options.dto';
import { FindManyOptionsDto } from '../dto/find-many-options.dto';
import { AddRelationOptionsDto } from '../dto/add-relation-options.dto';
import { RemoveRelationOptionsDto } from '../dto/remove-relation-options.dto';
import { CountByRelationOptionsDto } from '../dto/count-by-relations-options.dto';
import { UnsetRelationOptionsDto } from '../dto/unset-relation-options.dto';
import { SetRelationOptionsDto } from '../dto/set-relation-options.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { CountResultDto } from '../dto/count-result.dto';

export class EntityRelationService<Entity extends ObjectLiteral>
  extends BaseService<Entity>
  implements RelationService<Entity, FindOperator<any>>
{
  protected async __findOneById(id: number, relationName: string) {
    this.logger.debug(`async : ${JSON.stringify({ id, relationName })}`);
    return await this.repo
      .createQueryBuilder('m')
      .select(['m.id', 'r.id'])
      .leftJoinAndSelect('m.' + relationName, 'r')
      .where({ id })
      .getOne();
  }

  async addRelation(params: AddRelationOptionsDto): Promise<UpdateResultDto> {
    this.logger.debug(`addRelation : ${JSON.stringify(params)}`);
    const oldData = await this.__findOneById(params.id, params.relationName);
    await this.repo
      .createQueryBuilder()
      .relation(params.relationName)
      .of(params.id)
      .add(params.relationId);
    const newData = await this.__findOneById(params.id, params.relationName);
    return { raw: '', affected: 1, data: [oldData, newData] };
  }

  async removeRelation(
    params: RemoveRelationOptionsDto
  ): Promise<UpdateResultDto> {
    this.logger.debug(`removeRelation : ${JSON.stringify(params)}`);
    const oldData = await this.__findOneById(params.id, params.relationName);
    await this.repo
      .createQueryBuilder()
      .relation(params.relationName)
      .of(params.id)
      .remove(params.relationId);
    const newData = await this.__findOneById(params.id, params.relationName);
    return { raw: '', affected: 1, data: [oldData, newData] };
  }

  async setRelation(params: SetRelationOptionsDto): Promise<UpdateResultDto> {
    this.logger.debug(`setRelation : ${JSON.stringify(params)}`);
    const oldData = await this.__findOneById(params.id, params.relationName);
    await this.repo
      .createQueryBuilder()
      .relation(params.relationName)
      .of(params.id)
      .set(params.relationId);
    const newData = await this.__findOneById(params.id, params.relationName);
    return { raw: '', affected: 1, data: [oldData, newData] };
  }

  async unsetRelation(
    params: UnsetRelationOptionsDto
  ): Promise<UpdateResultDto> {
    this.logger.debug(`unsetRelation : ${JSON.stringify(params)}`);
    const oldData = await this.__findOneById(params.id, params.relationName);
    await this.repo
      .createQueryBuilder()
      .relation(params.relationName)
      .of(params.id)
      .set(null);
    const newData = await this.__findOneById(params.id, params.relationName);
    return { raw: '', affected: 1, data: [oldData, newData] };
  }

  async countByRelation(
    params: CountByRelationOptionsDto
  ): Promise<CountResultDto> {
    this.logger.debug(`countByRelation : ${JSON.stringify(params)}`);
    const { relationId, relationName } = params;
    const count = await this.repo
      .createQueryBuilder('m')
      .leftJoin('m.' + relationName, 'r')
      .where('r.id = :relationId', { relationId })
      .getCount();
    return { count };
  }

  async findByRelation(
    params: FindByRelationOptionsDto,
    query: FindManyOptionsDto<Entity>
  ): Promise<Entity[]> {
    this.logger.debug(
      `findByRelation : ${JSON.stringify(params)} ${JSON.stringify(query)}`
    );
    const { relationId, relationName } = params;
    const builder = this.repo.createQueryBuilder('m');

    builder
      .select(['m.id', 'r.id'])
      .leftJoin('m.' + relationName, 'r')
      .where('r.id = :relationId', { relationId });

    const { take, skip, withDeleted } = query;

    if (take) builder.take(take);
    if (skip) builder.skip(skip);
    if (withDeleted) builder.withDeleted();

    return await builder.getMany();
  }
}
