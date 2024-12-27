import { Nullable } from '@rline/type';

export type OrderDirection = 'asc' | 'desc' | 'ASC' | 'DESC' | '-1' | '1';

export type OrderItem = {
  property: Nullable<string>;
  direction: Nullable<OrderDirection>;
};
