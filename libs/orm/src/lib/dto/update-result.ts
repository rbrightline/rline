import { Property } from '@rline/property';
import { UpdateResult } from '@rline/type';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateResultDto implements UpdateResult {
  @Property({ type: 'integer' }) affected?: number | undefined;
}
