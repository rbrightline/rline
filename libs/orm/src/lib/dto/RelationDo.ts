import { Property } from '@rline/property';
import { num, str } from '@rline/type';
import { Exclude } from 'class-transformer';

@Exclude()
export class UnsetRelationDto {
  @Property({ type: 'integer', required: true })
  id = num();

  @Property({ type: 'string', required: true })
  rn = str();
}

@Exclude()
export class SetRelationDto extends UnsetRelationDto {
  @Property({ type: 'integer', required: true })
  rid = num();
}

@Exclude()
export class AddRelationDto extends SetRelationDto {}

@Exclude()
export class RemoveRelationDto extends SetRelationDto {}
