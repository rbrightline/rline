import { Column } from '../../orm/Column';
import { Entity } from '../../orm/Entity';
import { BaseEntity } from '../../base/BaseEntity';
import { num, obj } from '@rline/type';

@Entity()
export class Operation extends BaseEntity<Operation> {
  @Column({ type: 'jsonb', nullable: true }) data = obj<any>(null);
  @Column({ type: 'integer', nullable: true }) count = num(0);
}
