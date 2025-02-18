import { SampleModel } from '@rline/model';
import { IDDto } from '@rline/orm';
import { Property } from '@rline/property';
import { Exclude } from 'class-transformer';
import { Category } from '../category';

@Exclude()
export class CreateSampleDto implements SampleModel {
  @Property({ type: 'string', minLength: 3, maxLength: 30 }) name: string;
  @Property({ type: 'number', minimum: 0, maximum: 100 }) number: number;
  @Property({ type: 'integer', minimum: 0, maximum: 10 }) integer: number;
  @Property({ type: 'boolean', default: true }) boolean: boolean;
  @Property({ type: 'date', isDateString: true }) date: Date;
  @Property({ type: 'object', target: () => IDDto }) category: Category;
  @Property({ type: 'array', items: { type: 'object', target: () => IDDto } })
  categories: Category[];
}
