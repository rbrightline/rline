import { Property } from '@rline/property';
import { RelationParam, UnsetRelationParam } from '@rline/type';
import { Exclude } from 'class-transformer';

@Exclude()
export class UnsetRelationParamDto implements UnsetRelationParam {
  @Property({
    type: 'integer',
    required: true,
    minimum: 1,
    description: 'Entity id',
    isIntegerString: true,
  })
  id: number;

  @Property({
    type: 'string',
    minLength: 1,
    maxLength: 30,
    description: 'Relation name',
  })
  rn: string;
}

@Exclude()
export class RelationParamDto
  extends UnsetRelationParamDto
  implements RelationParam
{
  @Property({
    type: 'integer',
    required: true,
    minimum: 1,
    description: 'Relation id',
    isIntegerString: true,
  })
  rid: number;
}
