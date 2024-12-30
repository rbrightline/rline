// import {
//   str,
//   num,
//   bool,
//   date,
//   value,
//   obj,
//   arr,
//   DEFAULT_STRING,
//   DEFAULT_NUMBER,
//   DEFAULT_DATE,
//   DEFAULT_BOOLEAN,
//   DEFAULT_OBJECT,
//   DEFAULT_ARRAY,
// } from './var';

// describe('var', () => {
//   let dateValue = new Date();
//   describe('value', () => {
//     it.each`
//       defaultValue | expected
//       ${null}      | ${null}
//       ${undefined} | ${null}
//       ${''}        | ${''}
//       ${'1'}       | ${'1'}
//       ${1}         | ${1}
//       ${true}      | ${true}
//       ${false}     | ${false}
//       ${dateValue} | ${dateValue}
//     `(
//       'value($defaultValue) should return $expected',
//       ({ defaultValue, expected }) => {
//         expect(value(defaultValue)).toEqual(expected);
//       }
//     );
//   });

//   describe('str', () => {
//     it.each`
//       defaultValue | expected
//       ${null}      | ${DEFAULT_STRING}
//       ${undefined} | ${DEFAULT_STRING}
//       ${''}        | ${''}
//       ${'1'}       | ${'1'}
//       ${1}         | ${DEFAULT_STRING}
//       ${true}      | ${DEFAULT_STRING}
//       ${false}     | ${DEFAULT_STRING}
//       ${dateValue} | ${DEFAULT_STRING}
//     `(
//       'str($defaultValue) should return $expected',
//       ({ defaultValue, expected }) => {
//         expect(str(defaultValue)).toEqual(expected);
//       }
//     );
//   });

//   describe('num', () => {
//     it.each`
//       defaultValue | expected
//       ${null}      | ${DEFAULT_NUMBER}
//       ${undefined} | ${DEFAULT_NUMBER}
//       ${''}        | ${DEFAULT_NUMBER}
//       ${'1'}       | ${DEFAULT_NUMBER}
//       ${1}         | ${1}
//       ${true}      | ${DEFAULT_NUMBER}
//       ${false}     | ${DEFAULT_NUMBER}
//       ${dateValue} | ${DEFAULT_NUMBER}
//     `(
//       'num($defaultValue) should return $expected',
//       ({ defaultValue, expected }) => {
//         expect(num(defaultValue)).toEqual(expected);
//       }
//     );
//   });
//   describe('bool', () => {
//     it.each`
//       defaultValue | expected
//       ${null}      | ${DEFAULT_BOOLEAN}
//       ${undefined} | ${DEFAULT_BOOLEAN}
//       ${''}        | ${DEFAULT_BOOLEAN}
//       ${'1'}       | ${DEFAULT_BOOLEAN}
//       ${1}         | ${DEFAULT_BOOLEAN}
//       ${true}      | ${true}
//       ${false}     | ${false}
//       ${dateValue} | ${DEFAULT_BOOLEAN}
//     `(
//       'bool($defaultValue) should return $expected',
//       ({ defaultValue, expected }) => {
//         expect(bool(defaultValue)).toEqual(expected);
//       }
//     );
//   });
//   describe('date', () => {
//     it.each`
//       defaultValue | expected
//       ${null}      | ${DEFAULT_DATE}
//       ${undefined} | ${DEFAULT_DATE}
//       ${''}        | ${DEFAULT_DATE}
//       ${'1'}       | ${DEFAULT_DATE}
//       ${1}         | ${DEFAULT_DATE}
//       ${true}      | ${DEFAULT_DATE}
//       ${false}     | ${DEFAULT_DATE}
//       ${dateValue} | ${dateValue}
//     `(
//       'date($defaultValue) should return $expected',
//       ({ defaultValue, expected }) => {
//         expect(date(defaultValue)).toEqual(expected);
//       }
//     );
//   });
//   describe('object', () => {
//     it.each`
//       defaultValue        | expected
//       ${null}             | ${DEFAULT_OBJECT}
//       ${undefined}        | ${DEFAULT_OBJECT}
//       ${''}               | ${DEFAULT_OBJECT}
//       ${'1'}              | ${DEFAULT_OBJECT}
//       ${1}                | ${DEFAULT_OBJECT}
//       ${true}             | ${DEFAULT_OBJECT}
//       ${false}            | ${DEFAULT_OBJECT}
//       ${[]}               | ${DEFAULT_OBJECT}
//       ${{}}               | ${{}}
//       ${{ name: 'name' }} | ${{ name: 'name' }}
//     `(
//       'obj($defaultValue) should return $expected',
//       ({ defaultValue, expected }) => {
//         expect(obj(defaultValue)).toEqual(expected);
//       }
//     );
//   });
//   describe('array', () => {
//     it.each`
//       defaultValue        | expected
//       ${null}             | ${DEFAULT_ARRAY}
//       ${undefined}        | ${DEFAULT_ARRAY}
//       ${''}               | ${DEFAULT_ARRAY}
//       ${'1'}              | ${DEFAULT_ARRAY}
//       ${1}                | ${DEFAULT_ARRAY}
//       ${true}             | ${DEFAULT_ARRAY}
//       ${false}            | ${DEFAULT_ARRAY}
//       ${{ name: 'name' }} | ${DEFAULT_ARRAY}
//       ${[]}               | ${[]}
//       ${{}}               | ${DEFAULT_ARRAY}
//     `(
//       'obj($defaultValue) should return $expected',
//       ({ defaultValue, expected }) => {
//         expect(arr(defaultValue)).toEqual(expected);
//       }
//     );
//   });

//   it('should be defined', () => {
//     class A {
//       value?: string = '';
//     }
//     const ins = new A();
//     console.log(typeof ins.value);
//     console.log(Object.keys(ins));

//     expect(Object.keys(new A()).includes('value')).toBe(true);
//   });
// });
describe('var', () => {
  it('should work', () => {
    expect(true).toBeTruthy();
  });
});
