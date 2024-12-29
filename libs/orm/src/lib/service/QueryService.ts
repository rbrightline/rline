import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { FindOptionsDto } from '../query/FindOptionsDto';
import { FindByRelationValueDto } from '../query/FindByRelationValueDto';

export class QueryService<T extends ObjectLiteral> {
  constructor(protected readonly repo: Repository<T>) {}

  async findAll(
    findOptions?: FindOptionsDto<T>,
    whereOptions?: FindOptionsWhere<T>
  ) {
    return this.repo.find({ ...findOptions, where: whereOptions });
  }

  async findOne(
    findOptions: FindOptionsDto<T>,
    whereOptions: FindOptionsWhere<T>
  ) {
    const { select, loadEagerRelations, loadRelationIds, withDeleted } =
      findOptions;
    return this.repo.findOne({
      where: whereOptions,
      select,
      loadEagerRelations: loadEagerRelations || false,
      loadRelationIds: loadRelationIds || false,
      withDeleted: withDeleted || false,
    });
  }

  async findOneById(id: T['id'], findOptions: FindOptionsDto<T> = {}) {
    return this.findOne(findOptions, { id });
  }

  async findByRelation(
    relationOptions: FindByRelationValueDto,
    findOptions?: FindOptionsDto<T>
  ) {
    const { key, rn, value } = relationOptions;
    const query = this.repo
      .createQueryBuilder('m')
      .leftJoin(`m.${rn}`, rn!)
      .where(`${rn}.${key}= :value`, { value })
      .select(['m.id', `${rn}.id`]);

    if (findOptions?.withDeleted) query.withDeleted();
    if (findOptions?.orderBy && findOptions.orderDir) {
      query.orderBy(
        findOptions.orderBy as string,
        findOptions.orderDir,
        'NULLS LAST'
      );
    }

    return query.getMany();
  }

  countEntity(
    whereOptions: FindOptionsWhere<T>,
    findOptions?: FindOptionsDto<T>
  ): Promise<number> {
    return this.repo.count({
      withDeleted: !!findOptions?.withDeleted,
      where: whereOptions,
    });
  }

  async countByRelation(
    relationOptions: FindByRelationValueDto,
    findOptions?: FindOptionsDto<T>
  ) {
    const { key, rn, value } = relationOptions;
    const query = this.repo
      .createQueryBuilder('m')
      .leftJoin(`m.${rn}`, rn!)
      .where(`${rn}.${key}= :value`, { value })
      .select(['m.id', `${rn}.id`]);

    if (findOptions?.withDeleted) {
      query.withDeleted();
    }
    return { count: query.getCount() };
  }
}
