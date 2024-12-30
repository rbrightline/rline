/**
 * Represents a base entity view that extends the functionality of an active entity.
 * This class implements the `BaseModel` interface and provides additional properties
 * with decorators to define their types and database column mappings.
 * 
 * @extends ActiveEntity
 * @implements BaseModel
 */
import { BaseModel, num, NULL_OBJECT } from '@rline/type';
import { ActiveEntity } from './ActiveEntity';
import { ViewColumn } from '../orm/ViewColumn';

export class BaseEntityView extends ActiveEntity implements BaseModel {
  @ViewColumn({ type: 'string' }) info = NULL_OBJECT();
  @ViewColumn({ type: 'integer' }) updatedBy = num();
}
