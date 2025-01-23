import { Printable } from './printable.js';

export class BasePropertyPriner<PropertyOptions> implements Printable {
  constructor(protected readonly options: PropertyOptions) {}

  comment() {
    throw new Error('Not implemented!');
  }

  decorator() {
    throw new Error('Not implemented!');
  }

  decoratorOptions() {
    throw new Error('Not implemented!');
  }

  type() {
    throw new Error('Not implemented!');
  }

  defination() {
    throw new Error('Not implemented!');
  }

  print() {
    return [this.decorator(), this.defination()].join(' ');
  }
}
