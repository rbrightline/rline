import { PropertyOptions as O } from '../src';
import { createTestClassInstance, valiteTestClass } from './__utils';
import { assertErrors } from './boolean.spec';

describe('Array Property', () => {
  it.each`
    value                         | options                                            | errors
    ${{}}                         | ${{ items: { type: 'string' } } as O}              | ${[]}
    ${{ value: [] }}              | ${{ items: { type: 'string' } } as O}              | ${[]}
    ${{ value: ['some'] }}        | ${{ items: { type: 'string' } } as O}              | ${[]}
    ${{ value: ['1', '2', '3'] }} | ${{ maxItems: 2, items: { type: 'string' } } as O} | ${['arrayMaxSize']}
    ${{ value: ['1', '2', '3'] }} | ${{ minItems: 4, items: { type: 'string' } } as O} | ${['arrayMinSize']}
    ${{ value: [1] }}             | ${{ items: { type: 'string' } } as O}              | ${['isString']}
    ${{ value: [-1] }}            | ${{ items: { type: 'string' } } as O}              | ${['isString']}
    ${{ value: [0] }}             | ${{ items: { type: 'string' } } as O}              | ${['isString']}
    ${{ value: [true] }}          | ${{ items: { type: 'string' } } as O}              | ${['isString']}
    ${{ value: [false] }}         | ${{ items: { type: 'string' } } as O}              | ${['isString']}
    ${{ value: [{}] }}            | ${{ items: { type: 'string' } } as O}              | ${['isString']}
    ${{ value: 0 }}               | ${{ items: { type: 'string' } } as O}              | ${['isArray', 'isString']}
    ${{ value: -1 }}              | ${{ items: { type: 'string' } } as O}              | ${['isArray', 'isString']}
    ${{ value: 1 }}               | ${{ items: { type: 'string' } } as O}              | ${['isArray', 'isString']}
    ${{ value: {} }}              | ${{ items: { type: 'string' } } as O}              | ${['isArray', 'isString']}
    ${{ value: 'some' }}          | ${{ items: { type: 'string' } } as O}              | ${['isArray']}
  `(
    'should validate the $value with $options and throw $errors',
    ({ value, options, errors }) => {
      assertErrors(
        errors,
        valiteTestClass(
          createTestClassInstance(
            {
              type: 'array',
              ...options,
            },
            value
          )
        )
      );
    }
  );
});
