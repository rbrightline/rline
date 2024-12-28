import { arr, bool, num, obj, QueryModel } from '@rline/type';
import { Property, Data, OrderProperty } from '@rline/property';
import { Type } from '@nestjs/common';
import { OrderItemDto } from './OrderItemDto';
import { TimestampEntity } from '../base/TimestampEntity';

@Data()
export class QueryOneDto
  implements
    Pick<
      QueryModel<any>,
      'select' | 'withDeleted' | 'loadEagerRelations' | 'loadRelationIds'
    >
{
  @Property({ type: 'boolean', format: 'string', default: false }) withDeleted =
    bool();

  @Property({ type: 'array', items: { type: 'string' } })
  select = arr<string>();

  @Property({ type: 'boolean', format: 'string', default: false })
  loadEagerRelations = bool();

  @Property({ type: 'boolean', format: 'string', default: false })
  loadRelationIds = bool();
}

@Data()
export class QueryDto implements Partial<QueryModel<any>> {
  @Property({ type: 'integer', minimum: 1, format: 'string' }) take = num();
  @Property({ type: 'integer', minimum: 0, format: 'string' }) skip = num();
  @Property({ type: 'boolean', default: false, format: 'string' }) withDeleted =
    bool();
  @Property({ type: 'array', items: { type: 'string' } }) select =
    arr<string>();
  @OrderProperty(() => TimestampEntity) order = obj<OrderItemDto>();

  @Property({ type: 'boolean', format: 'string' }) loadEagerRelations = bool();
  @Property({ type: 'boolean', format: 'string' }) loadRelationIds = bool();
}

export function CreateQueryOneDto(entity: Type): Type {
  @Data()
  class __QueryOneDto extends QueryOneDto {
    @Property({
      type: 'array',
      items: { type: 'string', enum: Object.keys(entity) },
    })
    override select = arr<string>();
  }

  return __QueryOneDto;
}

export function CreateQueryDto(entity: () => Type): Type {
  @Data()
  class __QueryDto {
    @Property({ type: 'integer', minimum: 1, format: 'string' }) take = num();
    @Property({ type: 'integer', minimum: 0, format: 'string' }) skip = num();
    @Property({ type: 'boolean', default: false, format: 'string' })
    withDeleted = bool();

    @Property({
      type: 'array',
      items: { type: 'string', enum: Object.keys(new (entity())()) },
    })
    select = arr<string>();

    @OrderProperty(entity) order = obj<OrderItemDto>();

    @Property({ type: 'boolean', format: 'string' }) loadEagerRelations =
      bool();
    @Property({ type: 'boolean', format: 'string' }) loadRelationIds = bool();
  }

  return __QueryDto;
}
