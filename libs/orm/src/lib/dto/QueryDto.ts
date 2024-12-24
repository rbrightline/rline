import { arr, bool, num, obj, QueryModel } from '@rline/type';
import { Property, Data, OrderProperty } from '@rline/property';

@Data()
export class QueryOneDto
  implements
    Pick<
      QueryModel<any>,
      'select' | 'withDeleted' | 'loadEagerRelations' | 'loadRelationIds'
    >
{
  @Property({ type: 'boolean', default: false }) withDeleted = bool();
  @Property({ type: 'array', items: { type: 'string' } }) select =
    arr<string>();

  @Property({ type: 'boolean' }) loadEagerRelations = bool();
  @Property({ type: 'boolean' }) loadRelationIds = bool();
}

@Data()
export class QueryDto implements Partial<QueryModel<any>> {
  @Property({ type: 'integer', minimum: 1 }) take = num();
  @Property({ type: 'integer', minimum: 0 }) skip = num();
  @Property({ type: 'boolean', default: false }) withDeleted = bool();
  @Property({ type: 'array', items: { type: 'string' } }) select =
    arr<string>();

  @OrderProperty() order = obj();

  @Property({ type: 'boolean' }) loadEagerRelations = bool();
  @Property({ type: 'boolean' }) loadRelationIds = bool();
}
