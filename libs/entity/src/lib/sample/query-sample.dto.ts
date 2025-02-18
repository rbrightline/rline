import { SampleModel } from '@rline/model';
import { BaseQueryDto, QueryProperty } from '@rline/orm';
import { Exclude } from 'class-transformer';

@Exclude()
export class QuerySampleDto
  extends BaseQueryDto
  implements Record<keyof SampleModel, any>
{
  @QueryProperty({ type: 'string' }) category: any;
  @QueryProperty({ type: 'string' }) categories: any;
  @QueryProperty({ type: 'string' }) name: any;
  @QueryProperty({ type: 'number' }) number: any;
  @QueryProperty({ type: 'integer' }) integer: any;
  @QueryProperty({ type: 'boolean' }) boolean: any;
  @QueryProperty({ type: 'date' }) date: any;
}
