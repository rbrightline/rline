/**
 * Represents an active entity that extends the `TimestampEntity` and implements the `ActiveModel` interface.
 * This class includes a boolean `active` property that indicates whether the entity is active.
 *
 * @extends TimestampEntity
 * @implements ActiveModel
 *
 * @property {boolean} active - A boolean property that indicates if the entity is active. It is nullable.
 */
import { ActiveModel } from '@rline/type';
import { TimestampEntity } from './timestamp';
import { Column } from '../orm/column';

export class ActiveEntity extends TimestampEntity implements ActiveModel {
  @Column({ type: 'boolean' }) active?: boolean;
}
