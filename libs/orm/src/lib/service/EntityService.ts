import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DecrementDto, IncrementDto } from '../dto/increment.dto';
import { SetRelationDto, UnsetRelationDto } from '../dto/relation.dto';

export class EntityService<T extends {}> {
  constructor(protected readonly repo: Repository<T>) {}

  uniques() {
    return this.repo.metadata.uniques.map((e) => e.givenName);
  }

  async find(
    query: FindManyOptions<T>,
    where: FindOptionsWhere<T>
  ): Promise<T[]> {
    return await this.repo.find({ ...query, where });
  }

  async findOneBy(query: FindOptionsWhere<T>) {
    return await this.repo.findOneBy(query);
  }

  async save(entity: T) {
    return await this.repo.save(entity);
  }

  async update(query: FindOptionsWhere<T>, entity: QueryDeepPartialEntity<T>) {
    return await this.repo.update(query, entity);
  }

  async softDelete(query: FindOptionsWhere<T>) {
    return this.repo.softDelete(query);
  }

  async delete(query: FindOptionsWhere<T>) {
    return this.repo.delete(query);
  }

  async addRelation(relation: SetRelationDto) {
    const { id, rid, rn } = relation;
    return await this.repo.createQueryBuilder().relation(rn!).of(id).add(rid);
  }

  async removeRelation(relation: SetRelationDto) {
    const { id, rid, rn } = relation;
    return await this.repo
      .createQueryBuilder()
      .relation(rn!)
      .of(id)
      .remove(rid);
  }

  async setRelation(relation: SetRelationDto) {
    const { id, rid, rn } = relation;
    return await this.repo.createQueryBuilder().relation(rn!).of(id).set(rid);
  }

  async unsetRelation(relation: UnsetRelationDto) {
    const { id, rn } = relation;
    return await this.repo.createQueryBuilder().relation(rn!).of(id).set(null);
  }

  async count(query: FindManyOptions<T>) {
    return await this.repo.count(query);
  }

  async increment(query: FindOptionsWhere<T>, increment: IncrementDto) {
    return await this.repo.increment(
      query,
      increment.property!,
      increment.value!
    );
  }

  async decrement(query: FindOptionsWhere<T>, decrement: DecrementDto) {
    return await this.repo.decrement(
      query,
      decrement.property!,
      decrement.value!
    );
  }
}
