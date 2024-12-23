import { BaseModel, num, str } from '@rline/type';
import { ActiveEntity } from './ActiveEntity';
import { ViewColumn } from '../orm/ViewColumn';

export class BaseEntityView<T> extends ActiveEntity<T> implements BaseModel {
  @ViewColumn({ type: 'string' }) info = str();
  @ViewColumn({ type: 'integer' }) updatedBy = num();
}
