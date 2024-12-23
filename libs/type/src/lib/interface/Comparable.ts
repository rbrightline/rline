export interface Comparable<T> {
  compareTo(target: T): 1 | 0 | -1;
}
