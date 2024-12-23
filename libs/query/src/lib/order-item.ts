export type OrderDirection = 'asc' | 'desc' | 'ASC' | 'DESC' | -1 | 1;

export type OrderItem = {
  property: string;
  direction: OrderDirection;
};
