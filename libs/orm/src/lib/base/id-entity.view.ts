/**
 * Represents a view of an entity with an ID.
 * Implements the `IDModel` interface.
 */
import { IDModel } from '@rline/type';
import { ViewColumn } from '../orm/view-column.decorator';

export class IDEntityView implements IDModel {
  @ViewColumn({ type: 'integer' }) id?: number;
}
