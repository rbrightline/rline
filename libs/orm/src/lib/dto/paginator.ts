import { Property } from '@rline/property';
import { Keys } from '@rline/type';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../entity';

@Exclude()
export class PaginatorDto<T extends BaseEntity> {
  @Property({
    type: 'integer',
    default: 20,
    maximum: 100,
    minimum: 1,
    description: 'Take the number of items',
    isIntegerString: true,
  })
  take?: number;

  @Property({
    type: 'integer',
    default: 0,
    minimum: 0,
    description: 'Skip the number of items',
    isIntegerString: true,
  })
  skip?: number;

  @Property({
    type: 'array',
    items: { type: 'string', required: true, maxLength: 30 },
    description: 'Select the properties',
    isArrayString: true,
  })
  select?: Keys<T>;

  @Property({ type: 'boolean', default: false, isBooleanString: true })
  withDeleted?: boolean;
}
