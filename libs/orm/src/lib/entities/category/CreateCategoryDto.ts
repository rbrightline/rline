import { Data, Property } from '@rline/property';
import { CreateCategoryModel, str } from '@rline/type';

@Data()
export class CreateCategoryDto implements CreateCategoryModel {
  @Property({ type: 'string', required: true }) name = str();
}
