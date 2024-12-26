import { ActiveModel, ModelQuery, value } from '@rline/type';
import { QueryProperty } from '@rline/property';
import { TimestampQueryDto } from './TimestampQueryDto';
import { FindOperator } from 'typeorm';

export class ActiveQueryDto
  extends TimestampQueryDto
  implements ModelQuery<ActiveModel, FindOperator<any>>
{
  @QueryProperty() active = value<FindOperator<boolean>>();
}
