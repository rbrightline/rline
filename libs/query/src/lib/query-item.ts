import { QueryOperatorType } from './query-operator';

export type QueryItem = {
  operator: QueryOperatorType;
  value: string;
};
