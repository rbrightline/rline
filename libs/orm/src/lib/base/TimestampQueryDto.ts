import { ModelQuery, nvalue, TimestampModel } from '@rline/type';
import { IDQueryDto } from './IDQueryDto';
import { Data, QueryProperty } from '@rline/property';
import { FindOperator } from 'typeorm';

@Data()
export class TimestampQueryDto
  extends IDQueryDto
  implements ModelQuery<TimestampModel, FindOperator<any>>
{
  @QueryProperty() createdAt = nvalue<FindOperator<Date>>();
  @QueryProperty() updatedAt = nvalue<FindOperator<Date>>();
  @QueryProperty() deletedAt = nvalue<FindOperator<Date>>();
}
