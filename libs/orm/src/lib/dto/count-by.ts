import { Property } from '@rline/property';
import { Exclude } from 'class-transformer';

@Exclude()
export class CountByDto {
  @Property({ type: 'boolean', default: false }) withDeleted?: boolean;
}
