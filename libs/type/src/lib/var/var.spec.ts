import {
  str,
  num,
  bool,
  date,
  value,
  obj,
  arr,
  nvalue,
  nstr,
  nnum,
  nbool,
  ndate,
  nobj,
  narr,
} from './var';

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
      'arr($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(arr(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('nvalue', () => {
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
      'nvalue($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nvalue(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('nstr', () => {
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
      'nstr($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nstr(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('nnum', () => {
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
      'nnum($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nnum(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('nbool', () => {
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
      'nbool($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nbool(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('ndate', () => {
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
      'ndate($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(ndate(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('nobject', () => {
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
      'nobj($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(nobj(defaultValue)).toEqual(expected);
      }
    );
  });

  describe('narray', () => {
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
      'narr($defaultValue) should return $expected',
      ({ defaultValue, expected }) => {
        expect(narr(defaultValue)).toEqual(expected);
      }
    );
  });
});
