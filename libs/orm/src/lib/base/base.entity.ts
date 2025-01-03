/**
 * Represents the base entity class that extends the ActiveEntity and implements the BaseModel interface.
 * This class includes common properties for entities such as `info`, `createdBy`, and `updatedBy`.
 *
 * @extends ActiveEntity
 * @implements BaseModel
 */
import { BaseModel } from '@rline/type';
import { ActiveEntity } from './active.entity';
import { Column } from '../orm/column.decorator';

export class BaseEntity extends ActiveEntity implements BaseModel {
  @Column({ type: 'string' }) info?: string = 'info';
  @Column({ type: 'integer' }) createdBy?: number = 1;
  @Column({ type: 'integer' }) updatedBy?: number = 1;
}
