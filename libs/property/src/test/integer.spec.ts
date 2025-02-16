import { PropertyOptions as O } from '../lib';
import { createTestClassInstance, valiteTestClass } from './__utils';
import { assertErrors } from './boolean.spec';

describe('Integer Property', () => {
  it.each`
    value                | options                           | errors
    ${{}}                | ${{} as O}                        | ${[]}
    ${{ value: 1 }}      | ${{} as O}                        | ${[]}
    ${{ value: 0 }}      | ${{} as O}                        | ${[]}
    ${{ value: -1 }}     | ${{} as O}                        | ${[]}
    ${{ value: '1' }}    | ${{ isIntegerString: true } as O} | ${[]}
    ${{ value: '-1' }}   | ${{ isIntegerString: true } as O} | ${[]}
    ${{ value: '0' }}    | ${{ isIntegerString: true } as O} | ${[]}
    ${{}}                | ${{ required: true } as O}        | ${['isNotEmpty', 'isInt']}
    ${{ value: true }}   | ${{} as O}                        | ${['isInt']}
    ${{ value: false }}  | ${{} as O}                        | ${['isInt']}
    ${{ value: 'some' }} | ${{} as O}                        | ${['isInt']}
    ${{ value: 10.29 }}  | ${{} as O}                        | ${['isInt']}
    ${{ value: {} }}     | ${{} as O}                        | ${['isInt']}
  `(
    'should validate the $value with $options and throw $errors',
    ({ value, options, errors }) => {
      assertErrors(
        errors,
        valiteTestClass(
          createTestClassInstance({ type: 'integer', ...options }, value)
        )
      );
    }
  );
});
