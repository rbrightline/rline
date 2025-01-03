import { Column } from '../../orm/column.decorator';
import { Entity } from '../../orm/entity.decorator';
import { BaseEntity } from '../../base/base.entity';
import { CategoryModel } from '@rline/type';

@Entity()
export class Category extends BaseEntity implements CategoryModel {
  @Column({ type: 'string', unique: true })
  name?: string;
}
