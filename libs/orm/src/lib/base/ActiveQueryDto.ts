import { ActiveModel, ModelQuery, nvalue } from '@rline/type';
import { TimestampQueryDto } from './TimestampQueryDto';
import { FindOperator } from 'typeorm';

export class ActiveQueryDto
  extends TimestampQueryDto
  implements ModelQuery<ActiveModel, FindOperator<any>>
{
  active = nvalue<FindOperator<any>>();
}
