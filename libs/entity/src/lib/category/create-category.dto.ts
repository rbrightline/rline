import { CategoryModel } from '@rline/model';
import { Property } from '@rline/property';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateCategoryDto implements CategoryModel {
  @Property({ type: 'string', minLength: 3, maxLength: 30 }) name: string;
}
