import { Data, Property } from '@rline/property';
import { num } from '@rline/type';

@Data()
export class CountResultDto {
  @Property({ type: 'integer' }) count = num();
}
