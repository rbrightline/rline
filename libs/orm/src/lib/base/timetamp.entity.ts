import { Property } from '@rline/property';
import { IDModel, TimestampModel } from '@rline/type';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { IDEntity } from './id.entity';

/**
 * Represents an entity with timestamp fields for creation, update, and deletion.
 *
 * @extends IDEntity
 * @implements TimestampModel
 * @implements IDModel
 *
 * @property {string} createdAt - The date and time when the entity was created.
 * @property {string} updatedAt - The date and time when the entity was last updated.
 * @property {string} deletedAt - The date and time when the entity was deleted.
 */
export class TimestampEntity
  extends IDEntity
  implements TimestampModel, IDModel
{
  @Property({ type: 'string', format: 'date-time', required: false })
  @CreateDateColumn()
  createdAt?: Date = new Date(0);

  @Property({ type: 'string', format: 'date-time', required: false })
  @UpdateDateColumn()
  updatedAt?: Date = new Date(0);

  @Property({ type: 'string', format: 'date-time', required: false })
  @DeleteDateColumn()
  deletedAt?: Date = new Date(0);
}
