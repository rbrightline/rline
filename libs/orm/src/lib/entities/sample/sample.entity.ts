import { Column } from '../../orm/column.decorator';
import { Entity } from '../../orm/entity.decorator';
import { BaseEntity } from '../../base/base.entity';
import { SampleModel, SampleModelObject } from '@rline/type';
import { Category } from '../category/category';
import { Relation } from '../../orm/relation.decorator';

@Entity()
export class Sample extends BaseEntity implements SampleModel<Category> {
  @Column({ type: 'string', unique: true }) uniqueString?: string =
    'Unique string';

  @Column({ type: 'string' }) sampleString?: string = 'Sample string';

  @Column({ type: 'number' }) sampleNumber?: number = 10.99;

  @Column({ type: 'integer' }) sampleInteger?: number = 10;

  @Column({ type: 'date' }) sampleDate?: Date = new Date(0);

  @Column({ type: 'boolean' }) sampleBoolean?: boolean = true;

  @Column({ type: 'jsonb' }) sampleObject?: SampleModelObject = {
    property: 'key',
    value: 'example',
  };

  @Column({ type: 'array' }) sampleArray?: string[] = ['example', 'example'];

  @Relation({ type: 'one', target: () => Category }) category?: Category = {
    id: 1,
    name: 'Category',
  };

  @Relation({ type: 'many', target: () => Category }) categories?: Category[] =
    [
      { id: 1, name: 'Category' },
      { id: 2, name: 'Category' },
    ];
}
