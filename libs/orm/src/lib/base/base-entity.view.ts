/**
 * Represents a base entity view that extends the functionality of an active entity.
 * This class implements the `BaseModel` interface and provides additional properties
 * with decorators to define their types and database column mappings.
 *
 * @extends ActiveEntity
 * @implements BaseModel
 */
import { BaseModel } from '@rline/type';
import { ActiveEntity } from './active.entity';
import { ViewColumn } from '../orm/view-column.decorator';

export class BaseEntityView extends ActiveEntity implements BaseModel {
  @ViewColumn({ type: 'string' }) info?: string;
  @ViewColumn({ type: 'integer' }) updatedBy?: number;
}
