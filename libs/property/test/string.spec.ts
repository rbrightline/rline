import { PropertyOptions as O } from '../src';
import { createTestClassInstance, valiteTestClass } from './__utils';
import { assertErrors } from './boolean.spec';

describe('String Property', () => {
  it.each`
    value                | options                    | errors
    ${{}}                | ${{} as O}                 | ${[]}
    ${{ value: '' }}     | ${{} as O}                 | ${[]}
    ${{ value: 'some' }} | ${{} as O}                 | ${[]}
    ${{}}                | ${{ required: true } as O} | ${['isNotEmpty', 'isString']}
    ${{ value: 1 }}      | ${{} as O}                 | ${['isString']}
    ${{ value: -1 }}     | ${{} as O}                 | ${['isString']}
    ${{ value: 0 }}      | ${{} as O}                 | ${['isString']}
    ${{ value: {} }}     | ${{} as O}                 | ${['isString']}
    ${{ value: [] }}     | ${{} as O}                 | ${['isString']}
    ${{ value: '123' }}  | ${{ maxLength: 2 } as O}   | ${['maxLength']}
    ${{ value: '123' }}  | ${{ minLength: 4 } as O}   | ${['minLength']}
  `(
    'should validate the $value with $options and throw $errors',
    ({ value, options, errors }) => {
      assertErrors(
        errors,
        valiteTestClass(
          createTestClassInstance({ type: 'string', ...options }, value)
        )
      );
    }
  );
});
