import { date, IDModel, TimestampModel } from '@rline/type';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { IDEntity } from './IDEntity';
import { Property } from '@rline/property';

export class TimestampEntity<T>
  extends IDEntity<T>
  implements TimestampModel, IDModel
{
  @Property({ type: 'string', format: 'date-time', required: false })
  @CreateDateColumn()
  createdAt = date();

  @Property({ type: 'string', format: 'date-time', required: false })
  @UpdateDateColumn()
  updatedAt = date();

  @Property({ type: 'string', format: 'date-time', required: false })
  @DeleteDateColumn()
  deletedAt = date();
}
