import { PropertyOptions as O } from '../src';
import { createTestClassInstance, TestClass, valiteTestClass } from './__utils';
import { assertErrors } from './boolean.spec';

describe('Object Property', () => {
  it.each`
    value                           | options                    | errors
    ${{}}                           | ${{} as O}                 | ${[]}
    ${{ value: {} }}                | ${{} as O}                 | ${[]}
    ${{ value: { value: '' } }}     | ${{} as O}                 | ${[]}
    ${{ value: { value: 'some' } }} | ${{} as O}                 | ${[]}
    ${{ value: { value: 1 } }}      | ${{} as O}                 | ${['isString']}
    ${{ value: { value: -1 } }}     | ${{} as O}                 | ${['isString']}
    ${{ value: { value: 0 } }}      | ${{} as O}                 | ${['isString']}
    ${{ value: { value: true } }}   | ${{} as O}                 | ${['isString']}
    ${{ value: { value: false } }}  | ${{} as O}                 | ${['isString']}
    ${{ value: { value: {} } }}     | ${{} as O}                 | ${['isString']}
    ${{}}                           | ${{ required: true } as O} | ${['isNotEmpty', 'isObject']}
    ${{ value: true }}              | ${{} as O}                 | ${['isObject', 'nestedValidation']}
    ${{ value: false }}             | ${{} as O}                 | ${['isObject', 'nestedValidation']}
    ${{ value: 'some' }}            | ${{} as O}                 | ${['isObject', 'nestedValidation']}
    ${{ value: 1 }}                 | ${{} as O}                 | ${['isObject', 'nestedValidation']}
  `(
    'should validate the $value with $options and throw $errors',
    ({ value, options, errors }) => {
      assertErrors(
        errors,
        valiteTestClass(
          createTestClassInstance(
            { type: 'object', target: () => TestClass, ...options },
            value
          )
        )
      );
    }
  );
});
