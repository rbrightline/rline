import { Exclude } from 'class-transformer';
import { BaseQueryDto, QueryProperty } from '../../../src';
import { SampleModel } from './sample-model';

@Exclude()
export class QuerySampleDto extends BaseQueryDto implements SampleModel {
  @QueryProperty({ type: 'string' }) name: string;
  @QueryProperty({ type: 'number' }) number: number;
  @QueryProperty({ type: 'integer' }) integer: number;
  @QueryProperty({ type: 'boolean' }) boolean: boolean;
  @QueryProperty({ type: 'date' }) date: Date;
}
