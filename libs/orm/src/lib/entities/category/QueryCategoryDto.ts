import { Data, QueryProperty } from '@rline/property';
import { Nullable, CategoryModel, value } from '@rline/type';
import { FindOperator } from 'typeorm';

import { IDQueryDto } from '../../base/IDQueryDto';

@Data()
export class QueryCategoryDto
  extends IDQueryDto
  implements Record<keyof CategoryModel, Nullable<FindOperator<any>>>
{
  @QueryProperty() name = value<FindOperator<string>>();
}
