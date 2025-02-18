import { SampleModel } from '@rline/model';
import { BaseQueryDto, QueryProperty } from '@rline/orm';
import { Exclude } from 'class-transformer';

@Exclude()
export class QuerySampleDto extends BaseQueryDto implements SampleModel {
  @QueryProperty({ type: 'string' }) name: string;
  @QueryProperty({ type: 'number' }) number: number;
  @QueryProperty({ type: 'integer' }) integer: number;
  @QueryProperty({ type: 'boolean' }) boolean: boolean;
  @QueryProperty({ type: 'date' }) date: Date;
}
