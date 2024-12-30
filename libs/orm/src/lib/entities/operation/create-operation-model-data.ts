import { Data, Property } from '@rline/property';
import { OperationModelData } from '@rline/type';

@Data()
export class CreateOperationModelDataDto implements OperationModelData {
  @Property({ type: 'object' }, () => class ObjectData {})
  oldData: any;

  @Property({ type: 'object' }, () => class ObjectData {})
  newData: any;
}
