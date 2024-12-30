import { describe, it, expect } from 'vitest';
import { plainToClass } from 'class-transformer';
import { TransformOrderString } from './transform-order-string';

class TestClass {
  @TransformOrderString()
  order: any;
}

describe('TransformOrderString', () => {
  it('should transform a valid order string into an order object', () => {
    const obj = plainToClass(TestClass, { order: 'name::asc' });
    expect(obj.order).toEqual({ name: 'ASC' });
  });

  it('should return undefined for an invalid order string', () => {
    const obj = plainToClass(TestClass, { order: 'invalid' });
    expect(obj.order).toBeUndefined();
  });
});
