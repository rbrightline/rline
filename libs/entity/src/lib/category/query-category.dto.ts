import { CategoryModel } from '@rline/model';
import { BaseQueryDto, QueryProperty } from '@rline/orm';
import { Exclude } from 'class-transformer';

@Exclude()
export class QueryCategoryDto extends BaseQueryDto implements CategoryModel {
  @QueryProperty({ type: 'string' }) name: string;
}
