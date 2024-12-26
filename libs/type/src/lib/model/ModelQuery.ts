import { Nullable } from '../var/var';

export type ModelQuery<T, Operator> = Record<keyof T, Nullable<Operator>>;
