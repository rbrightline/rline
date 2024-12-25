import { Nullable } from '../var/var';
import { TimestampModel } from './TimestampModel';

export type OperationModelData = {
  oldData: Nullable<any>;
  newData: Nullable<any>;
};

export type OperationModel = TimestampModel & {
  data: Nullable<OperationModelData>;
};

export type CreateOperationModel = {
  data: Nullable<OperationModelData>;
};

export type UpdateOperationModel = CreateOperationModel;
