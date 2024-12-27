import { QueryOperatorType } from './query-operator';
import { Nullable } from '@rline/type';
export type QueryItem = {
  operator: Nullable<QueryOperatorType>;
  value: Nullable<string>;
};
