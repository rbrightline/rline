import { Data, Property } from '@rline/property';

@Data()
export class FindByRelationValueDto {
  /**
   * Relation name
   */
  @Property({ type: 'string', required: true })
  rn!: string;

  /**
   * Relation property name
   */
  @Property({ type: 'string', required: true })
  key!: string;

  /**
   * Relation property value
   */
  @Property({ type: 'string', required: true })
  value!: string;
}
