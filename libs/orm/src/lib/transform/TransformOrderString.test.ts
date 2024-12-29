import { describe, it, expect } from 'vitest';
import { plainToClass } from 'class-transformer';
import { TransformOrderString } from './TransformOrderString';
import { IsValidHandler } from '@rline/utils';

class TestClass {
  @TransformOrderString()
  order: any;
}

class TestClassWithValidation {
  @TransformOrderString((value) => value === 'valid')
  order: any;
}

describe('TransformOrderString', () => {
  it('should transform a valid order string into an order object', () => {
    const obj = plainToClass(TestClass, { order: 'name::asc' });
    expect(obj.order).toEqual({ name: 'ASC' });
  });

  it('should return null for an invalid order string', () => {
    const obj = () => plainToClass(TestClass, { order: 'invalid' });
    expect(obj).toThrow();
  });

  it('should validate the order string using the provided handler', () => {
    const obj = plainToClass(TestClassWithValidation, { order: 'valid' });
    expect(obj.order).toEqual({ valid: true });

    const invalidObj = () =>
      plainToClass(TestClassWithValidation, {
        order: 'invalid',
      });
    expect(invalidObj).toThrow();
  });
});
