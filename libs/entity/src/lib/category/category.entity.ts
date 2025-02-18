import { CategoryModel } from '@rline/model';
import { BaseEntity, Column, Entity } from '@rline/orm';
@Entity()
export class Category extends BaseEntity implements CategoryModel {
  @Column({ type: 'string' }) name: string;
}
