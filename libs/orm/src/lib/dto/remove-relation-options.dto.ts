import { RemoveRelationOptions } from '@rline/type';
import { IDProperty } from '../orm/id-property.decorator';
import { NameProperty } from '../orm/name-property.decorator';
import { Data } from '@rline/property';

@Data()
export class RemoveRelationOptionsDto implements RemoveRelationOptions {
  @IDProperty() id: number = 1;
  @IDProperty() relationId: number = 2;
  @NameProperty() relationName: string = 'category';
}
