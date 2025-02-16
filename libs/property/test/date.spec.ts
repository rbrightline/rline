import { PropertyOptions as O } from '../src';
import { createTestClassInstance, valiteTestClass } from './__utils';
import { assertErrors } from './boolean.spec';

describe('Object Property', () => {
  it.each`
    value                               | options                        | errors
    ${{}}                               | ${{} as O}                     | ${[]}
    ${{ value: new Date() }}            | ${{} as O}                     | ${[]}
    ${{ value: {} }}                    | ${{} as O}                     | ${['isDate']}
    ${{ value: 0 }}                     | ${{} as O}                     | ${['isDate']}
    ${{ value: -1 }}                    | ${{} as O}                     | ${['isDate']}
    ${{ value: 1 }}                     | ${{} as O}                     | ${['isDate']}
    ${{ value: '' }}                    | ${{} as O}                     | ${['isDate']}
    ${{ value: true }}                  | ${{} as O}                     | ${['isDate']}
    ${{ value: false }}                 | ${{} as O}                     | ${['isDate']}
    ${{ value: new Date().toString() }} | ${{} as O}                     | ${['isDate']}
    ${{ value: new Date().toString() }} | ${{ isDateString: true } as O} | ${[]}
  `(
    'should validate the $value with $options and throw $errors',
    ({ value, options, errors }) => {
      assertErrors(
        errors,
        valiteTestClass(
          createTestClassInstance({ type: 'date', ...options }, value)
        )
      );
    }
  );
});
