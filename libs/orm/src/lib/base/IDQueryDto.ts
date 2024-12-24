import { QueryProperty } from '@rline/property';
import { IDModel, num } from '@rline/type';


export class IDQueryDto implements IDModel {
  @QueryProperty() id = num();
}
