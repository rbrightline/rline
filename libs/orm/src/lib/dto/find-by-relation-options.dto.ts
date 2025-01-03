import { Data, Property } from '@rline/property';
import { FindByRelationOptions } from '@rline/type';

@Data()
export class FindByRelationOptionsDto implements FindByRelationOptions {
  @Property({ type: 'integer', minimum: 1 }) relationId: number = 2;
  @Property({ type: 'string', maxLength: 30 }) relationName: string =
    'category';
}
