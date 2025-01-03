import { Data, Property } from '@rline/property';
import { UpdateResult } from '@rline/type';

@Data()
export class UpdateResultDto implements UpdateResult {
  @Property({ type: 'string', example: '' }) raw: string = '';
  @Property({ type: 'integer', example: 1 }) affected: number = 1;
  @Property(
    {
      type: 'array',
      items: { type: 'object' },
      example: [
        { id: 1, name: 'Old value' },
        { id: 1, name: 'Updated value' },
      ],
    },
    () => class EmptyClass {}
  )
  data: any[] = [{ updatedAt: new Date() }, { updatedAt: new Date() }];
}
