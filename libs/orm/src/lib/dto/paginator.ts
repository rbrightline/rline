import { Property } from '@rline/property';
import { Keys } from '@rline/type';
import { BaseEntity } from '../entity';

export class PaginatorDto<T extends BaseEntity> {
  @Property({
    type: 'integer',
    default: 20,
    maximum: 100,
    minimum: 1,
    description: 'Take the number of items',
  })
  take: number;

  @Property({
    type: 'integer',
    default: 0,
    minimum: 0,
    description: 'Skip the number of items',
  })
  skip: number;

  @Property({
    type: 'array',
    items: { type: 'string', required: true, maxLength: 30 },
    description: 'Select the properties',
  })
  select: Keys<T>;

  @Property({ type: 'boolean', default: false }) withDeleted: boolean;
}
