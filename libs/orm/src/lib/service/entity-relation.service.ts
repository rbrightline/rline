import {
  AddRelationOptions,
  CountByRelationOptions,
  CountResult,
  FindByRelationOptions,
  FindManyOptions,
  RelationService,
  RemoveRelationOptions,
  SetRelationOptions,
  UnsetRelationOptions,
  UpdateResult,
} from '@rline/type';
import { FindOperator, ObjectLiteral, Repository } from 'typeorm';

export class EntityRelationService<Entity extends ObjectLiteral>
  implements RelationService<Entity, FindOperator<any>>
{
  constructor(protected readonly repo: Repository<Entity>) {}

  protected async __findOneById(id: number, relationName: string) {
    return await this.repo
      .createQueryBuilder('m')
      .select(['m.id', 'r.id'])
      .leftJoinAndSelect('m.' + relationName, 'r')
      .where({ id })
      .getOne();
  }

  async addRelation(params: AddRelationOptions): Promise<UpdateResult> {
    const oldData = await this.__findOneById(params.id, params.relationName);
    await this.repo
      .createQueryBuilder()
      .relation(params.relationName)
      .of(params.id)
      .add(params.relationId);
    const newData = await this.__findOneById(params.id, params.relationName);
    return { raw: '', affected: 1, data: [oldData, newData] };
  }

  async removeRelation(params: RemoveRelationOptions): Promise<UpdateResult> {
    const oldData = await this.__findOneById(params.id, params.relationName);
    await this.repo
      .createQueryBuilder()
      .relation(params.relationName)
      .of(params.id)
      .remove(params.relationId);
    const newData = await this.__findOneById(params.id, params.relationName);
    return { raw: '', affected: 1, data: [oldData, newData] };
  }

  async setRelation(params: SetRelationOptions): Promise<UpdateResult> {
    const oldData = await this.__findOneById(params.id, params.relationName);
    await this.repo
      .createQueryBuilder()
      .relation(params.relationName)
      .of(params.id)
      .set(params.relationId);
    const newData = await this.__findOneById(params.id, params.relationName);
    return { raw: '', affected: 1, data: [oldData, newData] };
  }

  async unsetRelation(params: UnsetRelationOptions): Promise<UpdateResult> {
    const oldData = await this.__findOneById(params.id, params.relationName);
    await this.repo
      .createQueryBuilder()
      .relation(params.relationName)
      .of(params.id)
      .set(null);
    const newData = await this.__findOneById(params.id, params.relationName);
    return { raw: '', affected: 1, data: [oldData, newData] };
  }

  async countByRelation(params: CountByRelationOptions): Promise<CountResult> {
    const { relationId, relationName } = params;
    const count = await this.repo
      .createQueryBuilder('m')
      .leftJoin('m.' + relationName, 'r')
      .where('r.id = :relationId', { relationId })
      .getCount();
    return { count };
  }

  async findByRelation(
    params: FindByRelationOptions,
    query: FindManyOptions<Entity, FindOperator<any>>
  ): Promise<Entity[]> {
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
