import { plainToInstance } from 'class-transformer';
import { BooleanValidation } from './BooleanValidation';
import { BooleanValidationOptions as O } from './BooleanValidationOptions';
import { validateTestInstance } from './__testHelper';

describe('BooleanValidation', () => {
  it.each`
    options                     | data                    | errors
    ${{ type: 'boolean' } as O} | ${{}}                   | ${['isBoolean']}
    ${{ type: 'boolean' } as O} | ${{ value: undefined }} | ${['isBoolean']}
    ${{ type: 'boolean' } as O} | ${{ value: null }}      | ${['isBoolean']}
    ${{ type: 'boolean' } as O} | ${{ value: '' }}        | ${['isBoolean']}
    ${{ type: 'boolean' } as O} | ${{ value: 1 }}         | ${['isBoolean']}
    ${{ type: 'boolean' } as O} | ${{ value: {} }}        | ${['isBoolean']}
    ${{ type: 'boolean' } as O} | ${{ value: true }}      | ${undefined}
    ${{ type: 'boolean' } as O} | ${{ value: false }}     | ${undefined}
  `(
    'should validate $data with $options and throw $errors',
    ({ options, data, errors }) => {
      class Sample {
        @BooleanValidation(options)
        value: any;
      }

      const instance = plainToInstance(Sample, data);
      console.log('instance ', instance);
      const foundErrors = validateTestInstance(instance);

      console.log('errrors ', foundErrors);

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
