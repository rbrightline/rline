import { Data, Property } from '@rline/property';
import { CountResult } from '@rline/type';

@Data()
export class CountResultDto implements CountResult {
  @Property({
    type: 'integer',
    description: 'The number of entities based on the query result.',
  })
  count: number = 0;
}
