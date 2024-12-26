import { Column } from '../../orm/Column';
import { Entity } from '../../orm/Entity';
import { BaseEntity } from '../../base/BaseEntity';
import { CategoryModel, str } from '@rline/type';

@Entity()
export class Category extends BaseEntity<Category> implements CategoryModel {
  @Column({ type: 'string', unique: true })
  name = str();
}
