import { Property } from '@rline/property';
import { num, str } from '@rline/type';
import { Exclude } from 'class-transformer';

@Exclude()
export class IncrementDto {
  @Property({ type: 'string' })
  property = str();

  @Property({ type: 'string' })
  value = num();
}

@Exclude()
export class DecrementDto extends IncrementDto {}
