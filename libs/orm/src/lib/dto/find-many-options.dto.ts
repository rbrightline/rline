import { Data, Property } from '@rline/property';
import { FindManyOptions, Order, WhereOptions } from '@rline/type';
import { FindOperator } from 'typeorm';
import { OrderQueryProperty } from '../orm/order-query-property.decorator';
import { WhereQueryProperty } from '../orm/where-query-property.decorator';
import { SelectQueryProperty } from '../orm/select-query-property.decorator';
import { WithDeleteQueryProperty } from '../orm/with-deleted-query-property.decorator';
import { LoadEagerRelationQueryProperty } from '../orm/load-eager-relations-query-property.decorator';
import { LoadRelationIdsProperty } from '../orm/load-relations-ids.decorators';

/**
 * Data Transfer Object (DTO) for specifying options to find many entities.
 *
 * @template T - The type of the entity.
 *
 * @property {number} [take=20] - The number of entities to take (limit).
 * @property {number} [skip=0] - The number of entities to skip (offset).
 * @property {boolean} [withDeleted=false] - Whether to include soft-deleted entities.
 * @property {(keyof T)[]} [select] - The properties of the entity to select.
 * @property {Order<T>} [order] - The order in which to sort the entities.
 * @property {WhereOptions<T, FindOperator<any>>} [where] - The conditions to filter the entities.
 * @property {string[]} [relations] - The relations to load with the entities.
 * @property {boolean} [loadEagerRelations=true] - Whether to load eager relations.
 * @property {boolean} [loadRelationIds=false] - Whether to load only the relation IDs.
 */
@Data()
export class FindManyOptionsDto<T>
  implements FindManyOptions<T, FindOperator<any>>
{
  constructor(options?: FindManyOptionsDto<T>) {
    Object.assign(this, options);
  }
  @Property({ type: 'integer', format: 'string', default: 20 })
  take?: number = 20;

  @Property({ type: 'integer', format: 'string', default: 0 })
  skip?: number = 0;

  @SelectQueryProperty() select?: (keyof T)[] = [
    'id',
    'createdAt',
  ] as (keyof T)[];

  @OrderQueryProperty() order?: Order<T>;

  @WhereQueryProperty() where?: WhereOptions<T, FindOperator<any>>;

  @SelectQueryProperty() relations?: string[] = ['category'];

  @WithDeleteQueryProperty() withDeleted?: boolean = false;

  @LoadEagerRelationQueryProperty() loadEagerRelations?: boolean = false;

  @LoadRelationIdsProperty() loadRelationIds?: boolean = false;
}
