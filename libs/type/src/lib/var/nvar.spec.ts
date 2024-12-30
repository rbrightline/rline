import { nvalue, nstr, nnum, nbool, ndate, nobj, narr } from './var';

describe('var', () => {
  let dateValue = new Date();
  describe('value', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${undefined}
      ${undefined} | ${undefined}
      ${''}        | ${''}
      ${'1'}       | ${'1'}
      ${1}         | ${1}
      ${true}      | ${true}
      ${false}     | ${false}
      ${dateValue} | ${dateValue}
    `(
      'value($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nvalue(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('str', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${undefined}
      ${undefined} | ${undefined}
      ${''}        | ${''}
      ${'1'}       | ${'1'}
      ${1}         | ${undefined}
      ${true}      | ${undefined}
      ${false}     | ${undefined}
      ${dateValue} | ${undefined}
    `(
      'str($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nstr(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('num', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${undefined}
      ${undefined} | ${undefined}
      ${''}        | ${undefined}
      ${'1'}       | ${undefined}
      ${1}         | ${1}
      ${true}      | ${undefined}
      ${false}     | ${undefined}
      ${dateValue} | ${undefined}
    `(
      'num($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nnum(defaultValue)).toEqual(expected);
      }
    );
  });
  describe('bool', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${undefined}
      ${undefined} | ${undefined}
      ${''}        | ${undefined}
      ${'1'}       | ${undefined}
      ${1}         | ${undefined}
      ${true}      | ${true}
      ${false}     | ${false}
      ${dateValue} | ${undefined}
    `(
      'bool($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nbool(defaultValue)).toEqual(expected);
      }
    );
  });
  describe('date', () => {
    it.each`
      defaultValue | expected
      ${null}      | ${undefined}
      ${undefined} | ${undefined}
      ${''}        | ${undefined}
      ${'1'}       | ${undefined}
      ${1}         | ${undefined}
      ${true}      | ${undefined}
      ${false}     | ${undefined}
      ${dateValue} | ${dateValue}
    `(
      'date($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(ndate(defaultValue)).toEqual(expected);
      }
    );
  });
  describe('object', () => {
    it.each`
      defaultValue        | expected
      ${null}             | ${undefined}
      ${undefined}        | ${undefined}
      ${''}               | ${undefined}
      ${'1'}              | ${undefined}
      ${1}                | ${undefined}
      ${true}             | ${undefined}
      ${false}            | ${undefined}
      ${[]}               | ${undefined}
      ${{}}               | ${{}}
      ${{ name: 'name' }} | ${{ name: 'name' }}
    `(
      'obj($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nobj(defaultValue)).toEqual(expected);
      }
    );
  });
  describe('array', () => {
    it.each`
      defaultValue        | expected
      ${null}             | ${undefined}
      ${undefined}        | ${undefined}
      ${''}               | ${undefined}
      ${'1'}              | ${undefined}
      ${1}                | ${undefined}
      ${true}             | ${undefined}
      ${false}            | ${undefined}
      ${{ name: 'name' }} | ${undefined}
      ${[]}               | ${[]}
      ${{}}               | ${undefined}
    `(
      'obj($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(narr(defaultValue)).toEqual(expected);
      }
    );
  });
});
