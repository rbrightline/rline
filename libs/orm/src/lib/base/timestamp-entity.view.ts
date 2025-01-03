/**
 * Represents a view entity with timestamp fields.
 *
 * This class extends `IDEntityView` and implements `TimestampModel` and `IDModel`.
 * It includes three timestamp fields: `createdAt`, `updatedAt`, and `deletedAt`,
 * each decorated with `@ViewColumn` to specify their type and format.
 *
 * @extends IDEntityView
 * @implements TimestampModel
 * @implements IDModel
 */
import { IDModel, TimestampModel } from '@rline/type';
import { IDEntityView } from './id-entity.view';
import { ViewColumn } from '../orm/view-column.decorator';

export class TimestampEntityView
  extends IDEntityView
  implements TimestampModel, IDModel
{
  @ViewColumn({ type: 'string', format: 'date-time' }) createdA?: Date;
  @ViewColumn({ type: 'string', format: 'date-time' }) updatedA?: Date;
  @ViewColumn({ type: 'string', format: 'date-time' }) deletedA?: Date;
}
