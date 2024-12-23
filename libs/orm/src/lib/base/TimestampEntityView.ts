import { date, IDModel, TimestampModel } from '@rline/type';
import { IDEntityView } from './IDEntityView';
import { ViewColumn } from '../orm/ViewColumn';

export class TimestampEntityView<T>
  extends IDEntityView<T>
  implements TimestampModel, IDModel
{
  @ViewColumn({ type: 'string', format: 'date-time' }) createdAt = date();

  @ViewColumn({ type: 'string', format: 'date-time' }) updatedAt = date();

  @ViewColumn({ type: 'string', format: 'date-time' }) deletedAt = date();
}
