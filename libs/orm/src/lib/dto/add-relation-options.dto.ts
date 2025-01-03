import { AddRelationOptions } from '@rline/type';
import { IDProperty } from '../orm/id-property.decorator';
import { NameProperty } from '../orm/name-property.decorator';
import { Data } from '@rline/property';

@Data()
export class AddRelationOptionsDto implements AddRelationOptions {
  @IDProperty() id: number = 1;
  @NameProperty() relationName: string = 'category';
  @IDProperty() relationId: number = 2;
}
