import { Property } from '@rline/property';
import { CountResult } from '@rline/type';
import { Exclude } from 'class-transformer';

@Exclude()
export class CountResultDto implements CountResult {
  @Property({ type: 'integer' }) count: number;
}
