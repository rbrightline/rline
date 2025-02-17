import { Property } from '@rline/property';
import { IDModel } from '@rline/type';
import { Exclude } from 'class-transformer';

@Exclude()
export class IDDto implements IDModel {
  @Property({ type: 'integer' })
  id: number;
}
