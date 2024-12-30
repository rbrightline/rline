import { Column } from '../../orm/column';
import { Entity } from '../../orm/entity';
import { BaseEntity } from '../../base/base';

@Entity()
export class Operation extends BaseEntity {
  @Column({ type: 'jsonb', nullable: true }) data?: Record<string, any>;
  @Column({ type: 'integer', nullable: true }) count?: number;
}
