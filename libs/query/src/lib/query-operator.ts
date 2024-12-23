export enum QueryOperator {
  EQUAL = 'eq',
  CONTAIN = 'cn',
  START_WITH = 'sw',
  END_WITH = 'ew',
  MORE_THAN = 'mt',
  LESS_THAN = 'lt',
  MORE_THAN_OR_EQUAL = 'mte',
  LESS_THAN_OR_EQUAL = 'lte',
  NOT_EQUAL = 'neq',
  NOT_CONTAIN = 'ncn',
  NOT_START_WITH = 'nsw',
  NOT_END_WITH = 'new',
}

export type QueryOperatorType =
  | 'eq'
  | 'cn'
  | 'sw'
  | 'ew'
  | 'mt'
  | 'lt'
  | 'mte'
  | 'lte'
  | 'neq'
  | 'ncn'
  | 'nsw'
  | 'new';
