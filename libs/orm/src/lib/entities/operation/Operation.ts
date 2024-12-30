import { Column } from '../../orm/column';
import { Entity } from '../../orm/entity';
import { BaseEntity } from '../../base/base';

@Entity()
export class Operation extends BaseEntity {
  @Column({ type: 'jsonb' }) data?: Record<string, any>;
  @Column({ type: 'integer' }) count?: number;
}
