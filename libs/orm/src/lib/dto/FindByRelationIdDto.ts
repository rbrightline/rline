import { Data, Property } from '@rline/property';
import { num, str } from '@rline/type';

@Data()
export class FindByRelationIdDto {
  /**
   * Relation name
   */
  @Property({ type: 'string', required: true })
  rn = str();

  @Property({ type: 'integer', required: true })
  rid = num();
}
