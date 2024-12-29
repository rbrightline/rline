import { BaseModel, ModelQuery, nvalue } from '@rline/type';
import { QueryProperty } from '@rline/property';
import { ActiveQueryDto } from './ActiveQueryDto';
import { FindOperator } from 'typeorm';

export class BaseQueryDto<T>
  extends ActiveQueryDto
  implements ModelQuery<BaseModel, FindOperator<any>>
{
  @QueryProperty() info = nvalue<FindOperator<string>>();
  @QueryProperty() createdBy = nvalue<FindOperator<number>>();
  @QueryProperty() updatedBy = nvalue<FindOperator<number>>();
}
