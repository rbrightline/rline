import { BaseModel, num, str } from '@rline/type';
import { QueryProperty } from '@rline/property';
import { ActiveQueryDto } from './ActiveQueryDto';

export class BaseQueryDto<T> extends ActiveQueryDto implements BaseModel {
  @QueryProperty() info = str();
  @QueryProperty() createdBy = num();
  @QueryProperty() updatedBy = num();
}
