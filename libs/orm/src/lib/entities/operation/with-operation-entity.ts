import { JoinTable, OneToMany } from 'typeorm';

import { Operation } from './operation';
import { Property } from '@rline/property';
import { ActiveEntity } from '../../base/active';

export class WithOperationEntity<T> extends ActiveEntity {
  @Property({ type: 'array', items: { type: 'object' } }, () => Operation)
  @OneToMany(() => Operation, (t) => t.id, {
    cascade: false,
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  operations?: Operation[];
}
