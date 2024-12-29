import { OrderDir } from './OrderDir';

export type FindOptions<T> = {
  take?: number;
  skip?: number;
  withDeleted?: boolean;
  select?: (keyof T)[];
  orderBy?: keyof T;
  orderDir?: OrderDir;
  loadEagerRelations?: boolean;
  loadRelationIds?: boolean;
};

