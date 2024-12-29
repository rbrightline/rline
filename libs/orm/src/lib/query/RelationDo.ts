import { Data, Property } from '@rline/property';
import { num, str } from '@rline/type';

@Data()
export class UnsetRelationDto {
  @Property({ type: 'integer', required: true, format: 'string' })
  id = num();

  @Property({ type: 'string', required: true })
  rn = str();
}

@Data()
export class SetRelationDto extends UnsetRelationDto {
  @Property({ type: 'integer', required: true, format: 'string' })
  rid = num();
}

@Data()
export class AddRelationDto extends SetRelationDto {}

@Data()
export class RemoveRelationDto extends SetRelationDto {}
