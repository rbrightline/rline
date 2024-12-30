import { Data, Property } from '@rline/property';
import { CreateCategoryModel } from '@rline/type';

@Data()
export class CreateCategoryDto implements CreateCategoryModel {
  @Property({ type: 'string', required: true }) name?: string;
}
