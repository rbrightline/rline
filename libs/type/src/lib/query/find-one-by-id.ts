export type FindOneByIdOptions = {
  select?: string[];
  relations?: string[];
  loadEagerRelations?: boolean;
  loadRelationIds?: boolean;
  withDeleted?: boolean;
};
