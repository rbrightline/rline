import { SampleModel } from '@rline/model';
import { Property } from '@rline/property';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateSampleDto implements SampleModel {
  @Property({ type: 'string' }) name: string;
}
