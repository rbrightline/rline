export interface Keys<T> {
  keys(): (keyof T)[];
}
