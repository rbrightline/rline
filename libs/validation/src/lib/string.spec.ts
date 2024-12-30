import { plainToInstance } from 'class-transformer';
import { Validation } from './validation';
import { validateTestInstance } from './__testHelper';
import { ValidationOptions as O } from './validation-options';
import 'reflect-metadata';

describe('StringValidation', () => {
  it.each`
    options                                                | data                    | errors
    ${{} as O}                                             | ${{ value: undefined }} | ${undefined}
    ${{} as O}                                             | ${{ value: null }}      | ${undefined}
    ${{ required: true } as O}                             | ${{ value: undefined }} | ${['isNotEmpty', 'isString']}
    ${{ required: true } as O}                             | ${{ value: null }}      | ${['isNotEmpty', 'isString']}
    ${{ required: true } as O}                             | ${{ value: 'some' }}    | ${undefined}
    ${{ required: true } as O}                             | ${{ value: '' }}        | ${['isNotEmpty']}
    ${{ minLength: 2, maxLength: 3, required: true } as O} | ${{ value: 'a' }}       | ${['minLength']}
    ${{ minLength: 2, maxLength: 3, required: true } as O} | ${{ value: 'abcd' }}    | ${['maxLength']}
  `(
    'should validate $data with $options and throw $errors',
    ({ options, data, errors }) => {
      class SampleSub {
        value: any;
      }

      class Sample {
        @Validation({ ...options, type: 'string' }, {}, () => SampleSub)
        value: any;
      }

      const instance = plainToInstance(Sample, data);
      const foundErrors = validateTestInstance(instance);

      if (foundErrors?.length != errors?.length) {
        console.log(instance);
        console.log(errors, foundErrors);
      }

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
