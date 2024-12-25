import { Type } from '@nestjs/common';
import { Data } from '@rline/property';

import { CreateDeleteResultDto } from './DeleteResultDto';

export function CreateUpdateResultDto(entity: Type): Type {
  @Data()
  class UpdateResultDto extends CreateDeleteResultDto(entity) {}

  return UpdateResultDto;
}
