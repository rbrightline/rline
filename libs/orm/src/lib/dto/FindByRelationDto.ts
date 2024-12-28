import { Data, Property } from '@rline/property';
import { str } from '@rline/type';

@Data()
export class FindByRelationDto {
  /**
   * Relation name
   */
  @Property({ type: 'string', required: true })
  rn = str();

  /**
   * Relation property name
   */
  @Property({ type: 'string', required: true })
  key = str();

  /**
   * Relation property value
   */
  @Property({ type: 'string', required: true })
  value = str();
}
