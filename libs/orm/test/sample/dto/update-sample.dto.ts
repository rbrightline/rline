import { Property } from '@rline/property';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateSampleDto {
  @Property({ type: 'string' }) name: string;
  @Property({ type: 'number' }) number: number;
  @Property({ type: 'integer' }) integer: number;
  @Property({ type: 'boolean' }) boolean: boolean;
  @Property({ type: 'date' }) date: Date;
}
