import { Nullable } from '../var/var';

export type DeleteResult = {
  raw: Nullable<string>;
  affected: Nullable<number>;
  data: Nullable<any[]>;
};
