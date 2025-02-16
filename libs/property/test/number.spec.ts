import { PropertyOptions as O } from '../src';
import { createTestClassInstance, valiteTestClass } from './__utils';
import { assertErrors } from './boolean.spec';

describe('Number Property', () => {
  it.each`
    value                                      | options                                          | errors
    ${{}}                                      | ${{} as O}                                       | ${[]}
    ${{ value: 1 }}                            | ${{} as O}                                       | ${[]}
    ${{ value: 0 }}                            | ${{} as O}                                       | ${[]}
    ${{ value: -1 }}                           | ${{} as O}                                       | ${[]}
    ${{ value: '1' }}                          | ${{ isNumberString: true } as O}                 | ${[]}
    ${{ value: '-1' }}                         | ${{ isNumberString: true } as O}                 | ${[]}
    ${{ value: '0' }}                          | ${{ isNumberString: true } as O}                 | ${[]}
    ${{}}                                      | ${{ required: true } as O}                       | ${['isNotEmpty', 'isNumber']}
    ${{ value: '12123981231123123123123123' }} | ${{ required: true, isNumberString: true } as O} | ${['isNotEmpty', 'isNumber']}
    ${{ value: true }}                         | ${{} as O}                                       | ${['isNumber']}
    ${{ value: false }}                        | ${{} as O}                                       | ${['isNumber']}
    ${{ value: 'some' }}                       | ${{} as O}                                       | ${['isNumber']}
    ${{ value: {} }}                           | ${{} as O}                                       | ${['isNumber']}
  `(
    'should validate the $value with $options and throw $errors',
    ({ value, options, errors }) => {
      assertErrors(
        errors,
        valiteTestClass(
          createTestClassInstance({ type: 'number', ...options }, value)
        )
      );
    }
  );
});
