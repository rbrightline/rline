import { Data, Property } from '@rline/property';
import { IDModel, num } from '@rline/type';

@Data()
export class IDDto implements IDModel {
  @Property({ type: 'integer', required: true }) id = num();
}
