export type UnsetRelationParam = {
  /**
   * Entity id
   */
  id: number;
  /**
   * Relation name
   */
  rn: string;
};

export type RelationParam = UnsetRelationParam & {
  /**
   * Relation id
   */
  rid: number;
};
