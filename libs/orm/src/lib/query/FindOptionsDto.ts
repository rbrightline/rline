import { FindOptions, IDModel, OrderDir } from '@rline/type';
import { Property, Data } from '@rline/property';
import { Type } from '@nestjs/common';
import { FindOptionsOrder } from 'typeorm';
import { Expose, Transform } from 'class-transformer';

@Data()
export class FindOptionsDto<T> implements FindOptions<T> {
  @Property({ type: 'integer', minimum: 1, format: 'string' }) take?: number;

  @Property({ type: 'integer', minimum: 0, format: 'string' }) skip?: number;

  @Property({ type: 'boolean', default: false, format: 'string' })
  withDeleted?: boolean;

  @Property({
    type: 'array',
    items: { type: 'string' },
  })
  select?: (keyof T)[];

  @Property({
    type: 'array',
    items: { type: 'string' },
  })
  relations?: string[];

  @Property({ type: 'string', default: 'id' }) orderBy?: keyof T;

  @Property({ type: 'string', default: 'id' }) orderDir?: OrderDir;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.orderBy) return { [obj.orderBy]: obj.orderDir ?? 'ASC' };
    return undefined;
  })
  order?: FindOptionsOrder<T>;

  @Property({ type: 'boolean', format: 'string', default: false })
  loadEagerRelations?: boolean;

  @Property({ type: 'boolean', format: 'string', default: false })
  loadRelationIds?: boolean;
}

export function CreateFindOptionsDto<T extends IDModel>(
  entity: () => Type
): Type<FindOptionsDto<T>> {
  @Data()
  class __FindOptionsDto implements FindOptions<T> {
    @Property({ type: 'integer', minimum: 1, format: 'string' }) take?: number;

    @Property({ type: 'integer', minimum: 0, format: 'string' }) skip?: number;

    @Property({ type: 'boolean', default: false, format: 'string' })
    withDeleted?: boolean;

    @Property({
      type: 'array',
      items: { type: 'string' },
      enum: Object.keys(new (entity())()),
    })
    select?: (keyof T)[];

    @Property({
      type: 'array',
      items: { type: 'string' },
      enum: Object.keys(new (entity())()),
    })
    relations?: string[];

    @Property({
      type: 'string',
      default: 'id',
      enum: Object.keys(new (entity())()),
    })
    orderBy?: keyof T;

    @Property({
      type: 'string',
      default: 'id',
      enum: ['ASC', 'DESC'],
    })
    orderDir?: OrderDir;

    @Expose()
    @Transform(({ obj }) => {
      if (obj.orderBy) return { [obj.orderBy]: obj.orderDir ?? 'ASC' };
      return undefined;
    })
    order?: FindOptionsOrder<T>;

    @Property({ type: 'boolean', format: 'string', default: false })
    loadEagerRelations?: boolean;

    @Property({ type: 'boolean', format: 'string', default: false })
    loadRelationIds?: boolean;
  }

  return __FindOptionsDto;
}
