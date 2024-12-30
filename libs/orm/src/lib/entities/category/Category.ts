import { Column } from '../../orm/column';
import { Entity } from '../../orm/entity';
import { BaseEntity } from '../../base/base';
import { CategoryModel } from '@rline/type';

@Entity()
export class Category extends BaseEntity implements CategoryModel {
  @Column({ type: 'string', unique: true })
  name?: string;
}
