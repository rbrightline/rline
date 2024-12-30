/**
 * Options for finding a single entity.
 */
export type FindOneOptions = {
  /**
   * If true, includes entities that have been soft-deleted.
   */
  withDeleted?: boolean;

  /**
   * Specifies which columns should be retrieved.
   */
  select?: string[];

  /**
   * Specifies which relations should be loaded.
   */
  relations?: string[];

  /**
   * Conditions to filter the entities.
   */
  where?: Record<string, any>;

  /**
   * If true, loads eager relations.
   */
  loadEagerRelations?: boolean;

  /**
   * If true, loads relation IDs instead of the actual entities.
   */
  loadRelationIds?: boolean;
};
