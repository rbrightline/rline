import { BaseModelClass, IDModel, num } from '@rline/type';
import { ViewColumn } from '../orm/ViewColumn';

export class IDEntityView<T> extends BaseModelClass<T> implements IDModel {
  @ViewColumn({ type: 'integer' }) id = num();
}
