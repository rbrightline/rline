import { SampleModel } from '@rline/model';
import { BaseEntity, Column, Entity } from '@rline/orm';

@Entity()
export class Sample extends BaseEntity implements SampleModel {
  @Column({ type: 'string' }) name: string;
  @Column({ type: 'number' }) number: number;
  @Column({ type: 'integer' }) integer: number;
  @Column({ type: 'boolean' }) boolean: boolean;
  @Column({ type: 'date' }) date: Date;
}
