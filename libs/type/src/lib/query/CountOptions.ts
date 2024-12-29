import { WhereOptions } from './WhereOptions';

export type CountOptions<Entity, Operator> = {
  withDeleted?: boolean;
  where?: WhereOptions<Entity, Operator>;
};
