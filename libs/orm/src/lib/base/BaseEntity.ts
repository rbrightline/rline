import { BaseModel, num, str } from '@rline/type';
import { ActiveEntity } from './ActiveEntity';
import { Column } from '../orm/Column';

export class BaseEntity<T> extends ActiveEntity<T> implements BaseModel {
  @Column({ type: 'string', nullable: true }) info = str();

  @Column({ type: 'integer', nullable: true }) updatedBy = num();
}
