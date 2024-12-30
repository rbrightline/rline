import { TimestampModel } from './timestamp';

export type OperationModelData = {
  oldData?: any;
  newData?: any;
};

export type OperationModel = TimestampModel & {
  data?: OperationModelData;
};

export type CreateOperationModel = {
  data?: OperationModelData;
};

export type UpdateOperationModel = CreateOperationModel;
