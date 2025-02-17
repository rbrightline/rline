import { SampleModel } from '@rline/model';
import { BaseEntity, Column, Entity } from '@rline/orm';

@Entity()
export class Sample extends BaseEntity implements SampleModel {
  @Column({ type: 'string' }) name: string;
}
