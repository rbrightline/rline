import { Data, Property } from '@rline/property';
import { DeleteResult } from '@rline/type';

@Data()
export class DeleteResultDto implements DeleteResult {
  @Property({ type: 'string', example: '' }) raw!: string;
  @Property({ type: 'integer', example: 1 }) affected!: number;
  @Property(
    { type: 'array', items: { type: 'object' } },
    () => class EmptyClass {}
  )
  data: any[] = [{ deletedAt: new Date() }, { deletedAt: new Date() }];
}
