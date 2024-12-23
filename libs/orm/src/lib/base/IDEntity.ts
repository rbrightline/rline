import { Property } from '@rline/property';
import { BaseModelClass, IDModel, num } from '@rline/type';
import { PrimaryGeneratedColumn } from 'typeorm';

export class IDEntity<T> extends BaseModelClass<T> implements IDModel {
  @Property({ type: 'integer', required: true })
  @PrimaryGeneratedColumn()
  id = num();
}
