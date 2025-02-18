import { SampleModel } from '@rline/model';
import { BaseEntity, Column, Entity, Relation } from '@rline/orm';
import { Category } from '../category';

@Entity()
export class Sample extends BaseEntity implements SampleModel {
  @Column({ type: 'string' }) name: string;
  @Column({ type: 'number' }) number: number;
  @Column({ type: 'integer' }) integer: number;
  @Column({ type: 'boolean' }) boolean: boolean;
  @Column({ type: 'date' }) date: Date;

  @Relation({
    type: 'many-to-many',
    target: () => Category,
    join: true,
    eager: true,
  })
  categories: Category;

  @Relation({
    type: 'many-to-one',
    target: () => Category,
    join: true,
    eager: true,
  })
  category: Category;
}
