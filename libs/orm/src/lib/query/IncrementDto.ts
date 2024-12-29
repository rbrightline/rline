import { Data, Property } from '@rline/property';
import { num, str } from '@rline/type';

@Data()
export class IncrementDto {
  @Property({ type: 'string' })
  property = str();

  @Property({ type: 'string' })
  value = num();
}

@Data()
export class DecrementDto extends IncrementDto {}
