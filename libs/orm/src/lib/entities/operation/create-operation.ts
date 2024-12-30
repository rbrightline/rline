import { Data, Property } from '@rline/property';
import { CreateOperationModel } from '@rline/type';
import { CreateOperationModelDataDto } from './create-operation-model-data';

@Data()
export class CreateOperationDto implements CreateOperationModel {
  @Property({ type: 'object' }, () => CreateOperationModelDataDto)
  data?: CreateOperationModelDataDto;
}
