import { Property } from '@rline/property';
import { KeyOf } from '@rline/type';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../entity';

@Exclude()
export class OrderDto<T extends BaseEntity> {
  @Property({ type: 'string', maxLength: 30 }) orderBy: KeyOf<T>;

  @Property({ type: 'string', enum: ['ASC', 'DESC'], default: 'ASC' })
  direction: 'ASC' | 'DESC';

  @Property({ type: 'string', enum: ['FIRST', 'LAST'], default: 'LAST' })
  nulls: 'FIRST' | 'LAST';
}
