import { Nullable } from '../var/var';

export type UpdateResult = {
  raw: Nullable<string>;
  affected: Nullable<number>;
  data: Nullable<any[]>;
};
