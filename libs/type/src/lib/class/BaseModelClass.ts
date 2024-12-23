export class BaseModelClass<T> {
  constructor(obj?: Partial<T>) {
    Object.assign(this, obj);
  }
}
