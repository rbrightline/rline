import { Property } from '@rline/property';
import { num, str } from '@rline/type';
import { Exclude } from 'class-transformer';

@Exclude()
export class UnsetRelationDto {
  @Property({ type: 'integer' })
  id = num();

  @Property({ type: 'string' })
  rn = str();
}

@Exclude()
export class SetRelationDto extends UnsetRelationDto {
  @Property({ type: 'integer' })
  rid = num();
}

@Exclude()
export class AddRelationDto extends SetRelationDto {}

@Exclude()
export class RemoveRelationDto extends SetRelationDto {}
