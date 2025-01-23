export type TimestampModel<T = Date> = {
  createdAt: T;
  updatedAt: T;
  deletedAt: T;
};
