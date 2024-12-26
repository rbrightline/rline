import { BaseModel, ModelQuery, value } from '@rline/type';
import { QueryProperty } from '@rline/property';
import { ActiveQueryDto } from './ActiveQueryDto';
import { FindOperator } from 'typeorm';

export class BaseQueryDto<T>
  extends ActiveQueryDto
  implements ModelQuery<BaseModel, FindOperator<any>>
{
  @QueryProperty() info = value<FindOperator<string>>();
  @QueryProperty() createdBy = value<FindOperator<number>>();
  @QueryProperty() updatedBy = value<FindOperator<number>>();
}
