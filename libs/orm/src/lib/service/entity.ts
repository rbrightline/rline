import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';
import {
  CountByDto,
  CountResultDto,
  DeleteResultDto,
  OrderDto,
  PaginatorDto,
  RelationParamDto,
  UnsetRelationParamDto,
  UpdateResultDto,
} from '../dto';
import { BaseEntity } from '../entity';

export class EntityService<
  T extends BaseEntity,
  CreateDto extends DeepPartial<T> = DeepPartial<T>,
  UpdateDto extends QueryDeepPartialEntity<T> = QueryDeepPartialEntity<T>
> {
  constructor(protected readonly repository: Repository<T>) {}

  async save(entity: CreateDto): Promise<T> {
    return await this.repository.save(entity);
  }

  async read(
    paginator: PaginatorDto<T>,
    where: FindOptionsWhere<T>,
    orderDto?: OrderDto<T>
  ) {
    return await this.repository.find({
      ...paginator,
      where,
      order: orderDto as unknown as FindOptionsOrder<T>,
    });
  }

  async readOneById(id: number) {
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async update(id: number, entity: UpdateDto): Promise<UpdateResultDto> {
    return await this.repository.update(id, entity);
  }

  async delete(id: number): Promise<UpdateResultDto> {
    return await this.repository.softDelete(id);
  }

  async hardDelete(id: number): Promise<DeleteResultDto> {
    return await this.repository.delete(id);
  }

  async addRelation(params: RelationParamDto): Promise<UpdateResultDto> {
    const { id, rid, rn } = params;
    await this.repository.createQueryBuilder().relation(rn).of(id).add(rid);
    return { affected: 1 };
  }

  async removeRelation(params: RelationParamDto): Promise<UpdateResultDto> {
    const { id, rid, rn } = params;
    await this.repository.createQueryBuilder().relation(rn).of(id).remove(rid);
    return { affected: 1 };
  }

  async setRelation(params: RelationParamDto): Promise<UpdateResultDto> {
    const { id, rid, rn } = params;
    await this.repository.createQueryBuilder().relation(rn).of(id).set(rid);
    return { affected: 1 };
  }

  async unsetRelation(params: UnsetRelationParamDto): Promise<UpdateResultDto> {
    const { id, rn } = params;
    await this.repository.createQueryBuilder().relation(rn).of(id).set(null);
    return { affected: 1 };
  }

  async count(): Promise<CountResultDto> {
    const allCount = await this.repository.count();
    return { count: allCount };
  }

  async countBy(options: CountByDto, where: FindOptionsWhere<T>) {
    return await this.repository.count({ ...options, where });
  }
}
