import { Type } from '@nestjs/common';
import { Data, Property } from '@rline/property';
import { arr, DeleteResult, num, str } from '@rline/type';

export function CreateUpdateResultDto(entity: Type) {
  @Data()
  class UpdateResultDto implements DeleteResult {
    @Property({ type: 'string' }) raw = str();
    @Property({ type: 'number' }) affected = num();
    @Property({ type: 'array', items: { type: 'object' } }, () => entity)
    data = arr();
  }

  return UpdateResultDto;
}
