/**
 * Represents an active entity view that extends the `TimestampEntityView` and implements the `ActiveModel` interface.
 * This class includes an `active` property which is a boolean column in the view.
 */
import { ActiveModel } from '@rline/type';
import { ViewColumn } from '../orm/view-column.decorator';
import { TimestampEntityView } from './timestamp-entity.view';

export class ActiveEntityView
  extends TimestampEntityView
  implements ActiveModel
{
  @ViewColumn({ type: 'boolean' }) active?: boolean;
}
