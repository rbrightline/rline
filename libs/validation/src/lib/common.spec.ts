import { plainToInstance } from 'class-transformer';
import { validateTestInstance } from './__testHelper';
import { Validation } from './validation';
import { ValidationOptions as O } from './validation-options';

describe('CommonValidation', () => {
  it.each`
    options                                       | data                    | errors
    ${{ type: 'string' }}                         | ${{ value: null }}      | ${undefined}
    ${{ type: 'string' }}                         | ${{ value: undefined }} | ${undefined}
    ${{ type: 'string', required: true } as O}    | ${{ value: null }}      | ${['isNotEmpty', 'isString']}
    ${{ type: 'number', required: true } as O}    | ${{ value: undefined }} | ${['isNotEmpty', 'isNumber']}
    ${{ type: 'integer', required: true } as O}   | ${{ value: undefined }} | ${['isNotEmpty', 'isInt']}
    ${{ type: 'boolean', required: true } as O}   | ${{ value: undefined }} | ${['isNotEmpty', 'isBoolean']}
    ${{ type: 'number' } as O}                    | ${{ value: '100' }}     | ${['isNumber']}
    ${{ type: 'number', format: 'string' } as O}  | ${{ value: '100' }}     | ${undefined}
    ${{ type: 'integer' } as O}                   | ${{ value: '100' }}     | ${['isInt']}
    ${{ type: 'integer', format: 'string' } as O} | ${{ value: '100' }}     | ${undefined}
    ${{ type: 'integer', format: 'string' } as O} | ${{ value: '100.001' }} | ${undefined}
    ${{ type: 'boolean' } as O}                   | ${{ value: 'true' }}    | ${['isBoolean']}
    ${{ type: 'boolean', format: 'string' } as O} | ${{ value: 'true' }}    | ${undefined}
    ${{ type: 'boolean', format: 'string' } as O} | ${{ value: 'trues' }}   | ${['isBoolean']}
  `(
    'should validate $data with $options and throw $errors',
    ({ options, data, errors }) => {
      class Sample {
        @Validation({ ...options })
        value: any;
      }

      const instance = plainToInstance(Sample, data);
      const foundErrors = validateTestInstance(instance);

      console.log(instance);
      console.log(errors);

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
