import { Property } from '@rline/property';
import { DeleteResult } from '@rline/type';
import { Exclude } from 'class-transformer';

@Exclude()
export class DeleteResultDto implements DeleteResult {
  @Property({ type: 'integer' }) affected?: number | null | undefined;
}
