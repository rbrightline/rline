import {
  DeleteOptions,
  DeleteResult,
  UpdateResult,
  WriteService,
} from '@rline/type';
import { keys } from '@rline/utils';
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

export class EntityWriteService<
  Entity extends ObjectLiteral,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto extends QueryDeepPartialEntity<Entity> = QueryDeepPartialEntity<Entity>
> implements WriteService<Entity, CreateDto, UpdateDto>
{
  constructor(private readonly repo: Repository<Entity>) {}

  protected async findById(id: number, select: any[]) {
    return await this.repo.findOne({
      where: { id } as any,
      select: select,
    });
  }

  save(entity: CreateDto): Promise<Entity> {
    return this.repo.save(entity);
  }

  async update(id: number, entity: UpdateDto): Promise<UpdateResult> {
    const oldData = await this.findById(id, keys(entity));
    const { raw, affected } = await this.repo.update(id, entity);
    const newData = await this.findById(id, keys(entity));

    return {
      raw,
      affected: affected ?? 0,
      data: [oldData, newData],
    };
  }
  delete(id: number, options?: DeleteOptions): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }

  restore(id: number): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
}
