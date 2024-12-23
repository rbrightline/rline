import { ActiveModel, bool } from '@rline/type';
import { TimestampEntity } from './TimestampEntity';
import { Column } from '../orm/Column';

export class ActiveEntity<T> extends TimestampEntity<T> implements ActiveModel {
  @Column({ type: 'boolean', nullable: true }) active = bool();
}
