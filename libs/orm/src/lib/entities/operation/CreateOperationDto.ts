import { Data } from '@rline/property';
import { CreateOperationModel, obj, OperationModelData } from '@rline/type';

@Data()
export class CreateOperationDto implements CreateOperationModel {
  data = obj<OperationModelData>(null);
}
