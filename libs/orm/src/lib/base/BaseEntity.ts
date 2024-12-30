/**
 * Represents the base entity class that extends the ActiveEntity and implements the BaseModel interface.
 * This class includes common properties for entities such as `info`, `createdBy`, and `updatedBy`.
 *
 * @extends ActiveEntity
 * @implements BaseModel
 */
import { BaseModel, num, NULL_OBJECT } from '@rline/type';
import { ActiveEntity } from './ActiveEntity';
import { Column } from '../orm/Column';

export class BaseEntity extends ActiveEntity implements BaseModel {
  @Column({ type: 'string', nullable: true }) info = NULL_OBJECT();
  @Column({ type: 'integer', nullable: true }) createdBy = num();
  @Column({ type: 'integer', nullable: true }) updatedBy = num();
}
