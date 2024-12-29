export type FindOneOptions = {
  withDeleted?: boolean;
  select?: string[];
  relations?: string[];
  where?: Record<string, any>;
  loadEagerRelations?: boolean;
  loadRelationIds?: boolean;
};
