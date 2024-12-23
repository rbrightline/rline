import { Cleanable } from './Cleanable';
import { Hashable } from './Hashable';
import { Keys } from './Keys';
import { Serializable } from './Serializable';

export interface BaseClassInterface<T>
  extends Serializable<T>,
    Keys<T>,
    Cleanable,
    Hashable {}

