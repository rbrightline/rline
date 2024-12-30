/**
 * Represents the base entity class that extends the ActiveEntity and implements the BaseModel interface.
 * This class includes common properties for entities such as `info`, `createdBy`, and `updatedBy`.
 *
 * @extends ActiveEntity
 * @implements BaseModel
 */
import { BaseModel } from '@rline/type';
import { ActiveEntity } from './active';
import { Column } from '../orm/column';

export class BaseEntity extends ActiveEntity implements BaseModel {
  @Column({ type: 'string' }) info?: string;
  @Column({ type: 'integer' }) createdBy?: number;
  @Column({ type: 'integer' }) updatedBy?: number;
}
