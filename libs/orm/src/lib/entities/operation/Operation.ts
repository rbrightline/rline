import { Column } from '../../orm/column.decorator';
import { Entity } from '../../orm/entity.decorator';
import { BaseEntity } from '../../base/base.entity';

@Entity()
export class Operation extends BaseEntity {
  @Column({ type: 'jsonb' }) data?: Record<string, any>;
  @Column({ type: 'integer' }) count?: number;
}
