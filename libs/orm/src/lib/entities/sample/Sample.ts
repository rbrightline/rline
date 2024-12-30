import { Column } from '../../orm/column';
import { Entity } from '../../orm/entity';
import { BaseEntity } from '../../base/base';
import { SampleModel, SampleModelObject } from '@rline/type';
import { Category } from '../category/category';
import { Relation } from '../../orm/relation';

@Entity()
export class Sample extends BaseEntity implements SampleModel<Category> {
  @Column({ type: 'string', unique: true }) uniqueString?: string;
  @Column({ type: 'string' }) sampleString?: string;
  @Column({ type: 'number' }) sampleNumber?: number;
  @Column({ type: 'integer' }) sampleInteger?: number;
  @Column({ type: 'date' }) sampleDate?: Date;
  @Column({ type: 'boolean' }) sampleBoolean?: boolean;
  @Column({ type: 'jsonb' }) sampleObject?: SampleModelObject;
  @Column({ type: 'array' }) sampleArray?: string[];

  @Relation({ type: 'one', target: () => Category })
  category?: Category;

  @Relation({ type: 'many', target: () => Category })
  categories?: Category[];
}
