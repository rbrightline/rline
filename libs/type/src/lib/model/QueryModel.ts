import { Nullable } from '../var/var';

export type QueryModel<OrderModel> = {
  take: Nullable<number>;
  skip: Nullable<number>;
  withDeleted: Nullable<boolean>;
  select: Nullable<string[]>;
  order: Nullable<OrderModel>;
  loadEagerRelations: Nullable<boolean>;
  loadRelationIds: Nullable<boolean>;
};
