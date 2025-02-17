import { BaseEntity, Column, Entity } from '../../src';
import { SampleModel } from './dto/sample-model';

@Entity()
export class Sample extends BaseEntity implements SampleModel {
  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'number' })
  number: number;

  @Column({ type: 'integer' })
  integer: number;

  @Column({ type: 'boolean' })
  boolean: boolean;

  @Column({ type: 'date' })
  date: Date;
}
