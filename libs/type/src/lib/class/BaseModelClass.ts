export class BaseModelClass<T = any> {
  constructor(obj?: Partial<T>) {
    Object.assign(this, obj);
  }
}
