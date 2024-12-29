import { Nonable } from '../var/var';

export type ModelQuery<T, Operator> = Record<keyof T, Nonable<Operator>>;
