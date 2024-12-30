import { Column } from '../../orm/column';
import { Entity } from '../../orm/entity';
import { BaseEntity } from '../../base/base';
import { SampleModel, SampleModelObject } from '@rline/type';
import { Category } from '../category/category';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Sample extends BaseEntity implements SampleModel<Category> {
  @Column({ type: 'string' }) sampleString?: string;
  @Column({ type: 'number' }) sampleNumber?: number;
  @Column({ type: 'integer' }) sampleInteger?: number;
  @Column({ type: 'date' }) sampleDate?: Date;
  @Column({ type: 'boolean' }) sampleBoolean?: boolean;
  @Column({ type: 'jsonb' }) sampleObject?: SampleModelObject;
  @Column({ type: 'array' }) sampleArray?: string[];

  @ManyToOne(() => Category, (c) => c.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  category?: Category;

  @ManyToMany(() => Category, (c) => c.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  categories?: Category[];
}
