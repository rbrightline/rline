import { BaseModelRaw } from './base';
import { TimestampModel } from './timestamp';

export type OperationModelData = {
  oldData?: any;
  newData?: any;
};

export type OperationModelRaw = {
  data: OperationModelData;
};

export type OperationModel = BaseModelRaw & TimestampModel & OperationModelRaw;

export type CreateOperationModel = OperationModelRaw & BaseModelRaw;

export type UpdateOperationModel = Partial<CreateOperationModel>;
