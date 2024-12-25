import { JoinTable, OneToMany } from 'typeorm';
import { arr } from '@rline/type';
import { Operation } from './Operation';
import { Property } from '@rline/property';
import { ActiveEntity } from '../../base/ActiveEntity';

export class WithOperationEntity<T> extends ActiveEntity<T> {
  @Property({ type: 'array', items: { type: 'object' } }, () => Operation)
  @OneToMany(() => Operation, (t) => t.id, {
    cascade: false,
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  operations = arr<Operation>(null);
}
