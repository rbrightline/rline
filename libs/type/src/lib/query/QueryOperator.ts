/**
 * Enum representing various query operators for filtering data.
 *
 * @enum {string}
 * @property {string} EQUAL - Represents the equality operator ('eq').
 * @property {string} CONTAIN - Represents the containment operator ('cn').
 * @property {string} START_WITH - Represents the starts with operator ('sw').
 * @property {string} END_WITH - Represents the ends with operator ('ew').
 * @property {string} MORE_THAN - Represents the greater than operator ('mt').
 * @property {string} LESS_THAN - Represents the less than operator ('lt').
 * @property {string} MORE_THAN_OR_EQUAL - Represents the greater than or equal operator ('mte').
 * @property {string} LESS_THAN_OR_EQUAL - Represents the less than or equal operator ('lte').
 * @property {string} NOT_EQUAL - Represents the not equal operator ('neq').
 * @property {string} NOT_CONTAIN - Represents the not contain operator ('ncn').
 * @property {string} NOT_START_WITH - Represents the not starts with operator ('nsw').
 * @property {string} NOT_END_WITH - Represents the not ends with operator ('new').
 */
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
