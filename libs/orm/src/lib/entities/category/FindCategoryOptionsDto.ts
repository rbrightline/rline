import { Data, QueryProperty } from '@rline/property';
import { Nullable, CategoryModel, value } from '@rline/type';
import { FindOperator } from 'typeorm';

import { IDQueryDto } from '../../base/IDQueryDto';
import { CreateFindOptionsDto } from '../../query/FindOptionsDto';
import { Category } from './Category';

@Data()
export class WhereCategoryOptionsDto
  extends IDQueryDto
  implements Record<keyof CategoryModel, Nullable<FindOperator<any>>>
{
  @QueryProperty() name = value<FindOperator<string>>();
}

@Data()
export class FindCategoryOptionsDto extends CreateFindOptionsDto(
  () => Category
) {}
