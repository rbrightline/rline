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
import { date, IDModel, TimestampModel } from '@rline/type';
import { IDEntityView } from './IDEntityView';
import { ViewColumn } from '../orm/ViewColumn';

export class TimestampEntityView
  extends IDEntityView
  implements TimestampModel, IDModel
{
  @ViewColumn({ type: 'string', format: 'date-time' }) createdAt = date();
  @ViewColumn({ type: 'string', format: 'date-time' }) updatedAt = date();
  @ViewColumn({ type: 'string', format: 'date-time' }) deletedAt = date();
}
