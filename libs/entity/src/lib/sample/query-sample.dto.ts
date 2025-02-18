import { BaseQueryDto, QueryProperty } from '@rline/orm';
import { Exclude } from 'class-transformer';

@Exclude()
export class QuerySampleDto extends BaseQueryDto {
  @QueryProperty({ type: 'string' }) name: string;
}
