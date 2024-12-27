import { plainToInstance } from 'class-transformer';
import { validateTestInstance } from './__testHelper';
import { Validation } from './Validation';
import { ValidationOptions as O } from './ValidationOptions';

describe('BooleanValidation', () => {
  it.each`
    options                      | data                    | errors
    ${{} as O}                   | ${{ value: undefined }} | ${undefined}
    ${{} as O}                   | ${{ value: null }}      | ${undefined}
    ${{ required: true } as O}   | ${{ value: undefined }} | ${['isNotEmpty', 'isBoolean']}
    ${{ required: true } as O}   | ${{ value: null }}      | ${['isNotEmpty', 'isBoolean']}
    ${{} as O}                   | ${{ value: '' }}        | ${['isBoolean']}
    ${{} as O}                   | ${{ value: 1 }}         | ${['isBoolean']}
    ${{} as O}                   | ${{ value: {} }}        | ${['isBoolean']}
    ${{} as O}                   | ${{ value: true }}      | ${undefined}
    ${{} as O}                   | ${{ value: false }}     | ${undefined}
    ${{ format: 'string' } as O} | ${{ value: 'false' }}   | ${undefined}
    ${{ format: 'string' } as O} | ${{ value: 'true' }}    | ${undefined}
    ${{ format: 'string' } as O} | ${{ value: 'some' }}    | ${['isBoolean']}
  `(
    'should validate $data with $options and throw $errors',
    ({ options, data, errors }) => {
      class Sample {
        @Validation({ ...options, type: 'boolean' })
        value: any;
      }

      const instance = plainToInstance(Sample, data);
      const foundErrors = validateTestInstance(instance);

      if (errors) {
        for (const e of errors) {
          expect(foundErrors).toBeTruthy();
          expect(foundErrors?.includes(e)).toBeTruthy();

          expect(foundErrors?.length).toEqual(errors?.length);
        }
      } else {
        expect(foundErrors).toBeNull();
      }
    }
  );
});
