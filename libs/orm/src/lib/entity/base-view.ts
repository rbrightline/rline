import { Exclude } from 'class-transformer';
import { ViewColumn } from '../decorator';

@Exclude()
export class BaseView {
  @ViewColumn({ type: 'integer' })
  id: number;
}
