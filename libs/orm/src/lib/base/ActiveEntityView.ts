import { ActiveModel, bool } from '@rline/type';
import { ViewColumn } from '../orm/ViewColumn';
import { TimestampEntityView } from './TimestampEntityView';

export class ActiveEntityView<T>
  extends TimestampEntityView<T>
  implements ActiveModel
{
  @ViewColumn({ type: 'boolean' }) active = bool();
}
