import { Column } from '../../orm/Column';
import { Entity } from '../../orm/Entity';
import { BaseEntity } from '../../base/BaseEntity';
import {
  arr,
  bool,
  date,
  num,
  obj,
  SampleModel,
  SampleModelObject,
  NULL_OBJECT,
} from '@rline/type';
import { Category } from '../category/Category';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Sample
  extends BaseEntity<Sample>
  implements SampleModel<Category>
{
  @Column({ type: 'string' }) sampleString = NULL_OBJECT();
  @Column({ type: 'number' }) sampleNumber = num();
  @Column({ type: 'integer' }) sampleInteger = num();
  @Column({ type: 'date' }) sampleDate = date();
  @Column({ type: 'boolean' }) sampleBoolean = bool();
  @Column({ type: 'jsonb' }) sampleObject = obj<SampleModelObject>();
  @Column({ type: 'array' }) sampleArray = arr<string>();

  @ManyToOne(() => Category, (c) => c.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  category = obj<Category>();

  @ManyToMany(() => Category, (c) => c.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  categories = arr<Category>();
}
