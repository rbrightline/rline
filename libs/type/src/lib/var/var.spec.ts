import { str, num, bool, date, value, obj, arr } from './var';

describe('var', () => {
  let dateValue = new Date();
  describe('value', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${null}
      ${undefined} | ${null}
      ${''}        | ${''}
      ${'1'}       | ${'1'}
      ${1}         | ${1}
      ${true}      | ${true}
      ${false}     | ${false}
      ${dateValue} | ${dateValue}
    `(
      'value($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(value(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('str', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${null}
      ${undefined} | ${null}
      ${''}        | ${''}
      ${'1'}       | ${'1'}
      ${1}         | ${null}
      ${true}      | ${null}
      ${false}     | ${null}
      ${dateValue} | ${null}
    `(
      'str($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(str(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('num', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${null}
      ${undefined} | ${null}
      ${''}        | ${null}
      ${'1'}       | ${null}
      ${1}         | ${1}
      ${true}      | ${null}
      ${false}     | ${null}
      ${dateValue} | ${null}
    `(
      'num($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(num(defaultValue)).toEqual(expected);
      }
    );
  });
  describe('bool', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${null}
      ${undefined} | ${null}
      ${''}        | ${null}
      ${'1'}       | ${null}
      ${1}         | ${null}
      ${true}      | ${true}
      ${false}     | ${false}
      ${dateValue} | ${null}
    `(
      'bool($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(bool(defaultValue)).toEqual(expected);
      }
    );
  });
  describe('date', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${null}
      ${undefined} | ${null}
      ${''}        | ${null}
      ${'1'}       | ${null}
      ${1}         | ${null}
      ${true}      | ${null}
      ${false}     | ${null}
      ${dateValue} | ${dateValue}
    `(
      'date($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(date(defaultValue)).toEqual(expected);
      }
    );
  });
  describe('object', () => {
    it.each`
      defaultValue        | expected
      ${null}             | ${null}
      ${undefined}        | ${null}
      ${''}               | ${null}
      ${'1'}              | ${null}
      ${1}                | ${null}
      ${true}             | ${null}
      ${false}            | ${null}
      ${[]}               | ${null}
      ${{}}               | ${{}}
      ${{ name: 'name' }} | ${{ name: 'name' }}
    `(
      'obj($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(obj(defaultValue)).toEqual(expected);
      }
    );
  });
  describe('array', () => {
    it.each`
      defaultValue        | expected
      ${null}             | ${null}
      ${undefined}        | ${null}
      ${''}               | ${null}
      ${'1'}              | ${null}
      ${1}                | ${null}
      ${true}             | ${null}
      ${false}            | ${null}
      ${{ name: 'name' }} | ${null}
      ${[]}               | ${[]}
      ${{}}               | ${null}
    `(
      'obj($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(arr(defaultValue)).toEqual(expected);
      }
    );
  });
});
