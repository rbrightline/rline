import { Data, Property } from '@rline/property';
import { CreateOperationModel, obj } from '@rline/type';
import { CreateOperationModelDataDto } from './CreateOperationModelDataDto';

@Data()
export class CreateOperationDto implements CreateOperationModel {
  @Property({ type: 'object' }, () => CreateOperationModelDataDto)
  data = obj<CreateOperationModelDataDto>(null);
}
