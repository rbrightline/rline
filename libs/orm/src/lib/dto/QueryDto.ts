import { arr, bool, num, obj, QueryModel } from '@rline/type';
import { Property, Data, OrderProperty } from '@rline/property';
import { Type } from '@nestjs/common';
import { OrderItemDto } from './OrderItemDto';

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
  @Property({ type: 'array', items: { type: 'string' } })
  select = arr<string>();

  @OrderProperty() order = obj<OrderItemDto>();

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

export function CreateQueryDto(entity: Type): Type {
  @Data()
  class __QueryDto extends QueryDto {
    @Property({
      type: 'array',
      items: { type: 'string', enum: Object.keys(entity) },
    })
    override select = arr<string>();

    @OrderProperty(entity)
    override order = obj<OrderItemDto>();
  }

  return __QueryDto;
}
