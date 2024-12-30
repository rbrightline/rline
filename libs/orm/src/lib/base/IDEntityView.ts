/**
 * Represents a view of an entity with an ID.
 * Implements the `IDModel` interface.
 */
import { IDModel, num } from '@rline/type';
import { ViewColumn } from '../orm/ViewColumn';

export class IDEntityView implements IDModel {
  @ViewColumn({ type: 'integer' }) id = num();
}
