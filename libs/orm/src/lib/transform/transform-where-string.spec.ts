import { describe, it, expect } from 'vitest';
import {
  transformWhereString,
  TransformWhereString,
} from './transform-where-string';
import { QueryOperator } from '@rline/type';
import { plainToInstance } from 'class-transformer';
import {
  Equal,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

describe('transformWhereString', () => {
  it.each`
    operator                            | value     | expected
    ${QueryOperator.CONTAIN}            | ${'test'} | ${ILike('%test%')}
    ${QueryOperator.END_WITH}           | ${'test'} | ${ILike('%test')}
    ${QueryOperator.START_WITH}         | ${'test'} | ${ILike('test%')}
    ${QueryOperator.EQUAL}              | ${'test'} | ${Equal('test')}
    ${QueryOperator.LESS_THAN}          | ${10}     | ${LessThan(10)}
    ${QueryOperator.MORE_THAN}          | ${10}     | ${MoreThan(10)}
    ${QueryOperator.LESS_THAN_OR_EQUAL} | ${10}     | ${LessThanOrEqual(10)}
    ${QueryOperator.MORE_THAN_OR_EQUAL} | ${10}     | ${MoreThanOrEqual(10)}
    ${QueryOperator.NOT_CONTAIN}        | ${'test'} | ${Not(ILike('%test%'))}
    ${QueryOperator.NOT_END_WITH}       | ${'test'} | ${Not(ILike('%test'))}
    ${QueryOperator.NOT_START_WITH}     | ${'test'} | ${Not(ILike('test%'))}
    ${QueryOperator.NOT_EQUAL}          | ${'test'} | ${Not(Equal('test'))}
  `(
    'should transform $operator with value $value to $expected',
    ({ operator, value, expected }) => {
      const result = transformWhereString(operator, value);
      expect(result).toEqual(expected);
    }
  );

  it('should return null for unrecognized operator', () => {
    const result = transformWhereString('UNKNOWN_OPERATOR', 'test');
    expect(result).toBeNull();
  });
});

describe('TransformWhereString decorator', () => {
  it('should transform string query to object', () => {
    class Example {
      @TransformWhereString()
      public where: any;
    }

    const instance = plainToInstance(Example, {
      query: 'property::eq::test',
    });
    expect(instance.where).toEqual({ where: { property: Equal('test') } });
  });

  it('should transform array of string queries to object', () => {
    class Example {
      @TransformWhereString()
      public where: any;
    }

    const instance = plainToInstance(Example, {
      where: ['name::eq::test', 'age::mt::30'],
    });
    expect(instance.where).toEqual({ name: Equal('test'), age: MoreThan(30) });
  });

  it('should return value as is if not string or array', () => {
    class Example {
      @TransformWhereString()
      public where: any;
    }

    const instance = plainToInstance(Example, { where: 123 });
    expect(instance.where).toEqual(null);
  });
});
