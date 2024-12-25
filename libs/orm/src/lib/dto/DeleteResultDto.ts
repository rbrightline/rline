import { Type } from '@nestjs/common';
import { Data, Property } from '@rline/property';
import { arr, DeleteResult, num, str } from '@rline/type';

export function CreateDeleteResultDto(entity: Type): Type {
  @Data()
  class DeleteResultDto implements DeleteResult {
    @Property({ type: 'string' }) raw = str('');
    @Property({ type: 'number' }) affected = num(1);
    @Property({ type: 'array', items: { type: 'object' } }, () => entity)
    data = arr([{ property: 'old value' }, { property: 'new value' }]);
  }

  return DeleteResultDto;
}
