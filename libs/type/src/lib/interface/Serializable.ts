export interface Serializable<T> {
  toJSON(): string;
  fromJSON(jsonString: string): T;
  toString(): string;
}
