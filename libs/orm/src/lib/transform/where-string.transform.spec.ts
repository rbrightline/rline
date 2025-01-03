import { describe, it, expect } from 'vitest';
import {
  transformWhereString,
  WhereStringTranform,
} from './where-string.transform';
import { QueryOperators } from '@rline/type';
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
    operator                             | value     | expected
    ${QueryOperators.CONTAIN}            | ${'test'} | ${ILike('%test%')}
    ${QueryOperators.END_WITH}           | ${'test'} | ${ILike('%test')}
    ${QueryOperators.START_WITH}         | ${'test'} | ${ILike('test%')}
    ${QueryOperators.EQUAL}              | ${'test'} | ${Equal('test')}
    ${QueryOperators.LESS_THAN}          | ${10}     | ${LessThan(10)}
    ${QueryOperators.MORE_THAN}          | ${10}     | ${MoreThan(10)}
    ${QueryOperators.LESS_THAN_OR_EQUAL} | ${10}     | ${LessThanOrEqual(10)}
    ${QueryOperators.MORE_THAN_OR_EQUAL} | ${10}     | ${MoreThanOrEqual(10)}
    ${QueryOperators.NOT_CONTAIN}        | ${'test'} | ${Not(ILike('%test%'))}
    ${QueryOperators.NOT_END_WITH}       | ${'test'} | ${Not(ILike('%test'))}
    ${QueryOperators.NOT_START_WITH}     | ${'test'} | ${Not(ILike('test%'))}
    ${QueryOperators.NOT_EQUAL}          | ${'test'} | ${Not(Equal('test'))}
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
      @WhereStringTranform()
      public where: any;
    }

    const instance = plainToInstance(Example, {
      where: 'property::eq::test',
    });
    expect(instance).toEqual({ where: { property: Equal('test') } });
  });

  it('should transform array of string queries to object', () => {
    class Example {
      @WhereStringTranform()
      public where: any;
    }

    const instance = plainToInstance(Example, {
      where: ['name::eq::test', 'age::mt::30'],
    });
    expect(instance).toEqual({
      where: {
        name: Equal('test'),
        age: MoreThan('30'),
      },
    });
  });

  it('should return value as is if not string or array', () => {
    class Example {
      @WhereStringTranform()
      public where: any;
    }

    const instance = plainToInstance(Example, { where: 123 });

    expect(instance.where).toEqual(undefined);
  });
});
