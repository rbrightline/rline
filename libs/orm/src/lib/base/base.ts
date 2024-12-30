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
  @Column({ type: 'string', nullable: true }) info?: string;
  @Column({ type: 'integer', nullable: true }) createdBy?: number;
  @Column({ type: 'integer', nullable: true }) updatedBy?: number;
}
