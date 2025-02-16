import { PropertyOptions as O } from '../src';
import { createTestClassInstance, valiteTestClass } from './__utils';

export function assertErrors(
  errors: string[],
  foundErrors: string[]
): boolean | never {
  if (!errors || !foundErrors)
    throw new Error('errors and foundErros are required!');

  if (errors.length > 0) {
    expect(foundErrors).toBeDefined();
    expect(errors.length).toEqual(foundErrors.length);

    for (const error of foundErrors) {
      expect(errors).include(error);
    }
  } else {
    if (foundErrors.length > 0) {
      console.log(foundErrors);
    }
    expect(foundErrors?.length).toEqual(0);
  }

  return true;
}

describe('Boolean Property', () => {
  it.each`
    value                 | options                           | errors
    ${{}}                 | ${{} as O}                        | ${[]}
    ${{ value: true }}    | ${{} as O}                        | ${[]}
    ${{ value: false }}   | ${{} as O}                        | ${[]}
    ${{ value: 'true' }}  | ${{ isBooleanString: true } as O} | ${[]}
    ${{ value: 'false' }} | ${{ isBooleanString: true } as O} | ${[]}
    ${{ value: 1 }}       | ${{} as O}                        | ${['isBoolean']}
    ${{ value: -1 }}      | ${{} as O}                        | ${['isBoolean']}
    ${{ value: 0 }}       | ${{} as O}                        | ${['isBoolean']}
    ${{ value: {} }}      | ${{} as O}                        | ${['isBoolean']}
    ${{ value: 'some' }}  | ${{} as O}                        | ${['isBoolean']}
    ${{ value: 'some' }}  | ${{ isBooleanString: true } as O} | ${['isBoolean']}
  `(
    'should validate the $value with $options and throw $errors',
    ({ value, options, errors }) => {
      assertErrors(
        errors,
        valiteTestClass(
          createTestClassInstance({ type: 'boolean', ...options }, value)
        )
      );
    }
  );
});
