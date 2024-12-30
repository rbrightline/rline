import { WhereOptions } from './where';

export type CountOptions<Entity, Operator> = {
  withDeleted?: boolean;
  where?: WhereOptions<Entity, Operator>;
};
