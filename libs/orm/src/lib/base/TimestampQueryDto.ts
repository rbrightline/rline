import { ModelQuery, TimestampModel, value } from '@rline/type';
import { IDQueryDto } from './IDQueryDto';
import { Data, QueryProperty } from '@rline/property';
import { FindOperator } from 'typeorm';

@Data()
export class TimestampQueryDto
  extends IDQueryDto
  implements ModelQuery<TimestampModel, FindOperator<any>>
{
  @QueryProperty() createdAt = value<FindOperator<Date>>();
  @QueryProperty() updatedAt = value<FindOperator<Date>>();
  @QueryProperty() deletedAt = value<FindOperator<Date>>();
}
