import { SampleModel } from '@rline/model';
import { Property } from '@rline/property';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateSampleDto implements SampleModel {
  @Property({ type: 'string', minLength: 3, maxLength: 30 }) name: string;
  @Property({ type: 'number', minimum: 0, maximum: 100 }) number: number;
  @Property({ type: 'integer', minimum: 0, maximum: 10 }) integer: number;
  @Property({ type: 'boolean', default: true }) boolean: boolean;
  @Property({ type: 'date', isDateString: true }) date: Date;
}
