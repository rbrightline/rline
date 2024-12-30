import { plainToInstance } from 'class-transformer';
import { Validation } from './validation';
import { validateTestInstance } from './__testHelper';
import 'reflect-metadata';

describe('ObjectValidation', () => {
  it.each`
    options                 | data                    | errors
    ${{}}                   | ${{ value: undefined }} | ${undefined}
    ${{}}                   | ${{ value: null }}      | ${undefined}
    ${{}}                   | ${{ value: 'some' }}    | ${['isObject', 'nestedValidation']}
    ${{}}                   | ${{ value: true }}      | ${['isObject', 'nestedValidation']}
    ${{}}                   | ${{ value: 1 }}         | ${['isObject', 'nestedValidation']}
    ${{}}                   | ${{ value: [] }}        | ${['isObject']}
    ${{ required: true }}   | ${{ value: undefined }} | ${['isNotEmpty', 'isObject']}
    ${{ required: true }}   | ${{ value: null }}      | ${['isNotEmpty', 'isObject', 'nestedValidation']}
    ${{}}                   | ${{ value: '{}' }}      | ${['isObject', 'nestedValidation']}
    ${{}}                   | ${{ value: '[]' }}      | ${['isObject', 'nestedValidation']}
    ${{ format: 'string' }} | ${{ value: '[]' }}      | ${['isObject']}
    ${{ format: 'string' }} | ${{ value: '{}' }}      | ${undefined}
  `(
    'should validate $data with $options and throw $errors',
    ({ options, data, errors }) => {
      class SampleSub {
        value: any;
      }

      class Sample {
        @Validation({ ...options, type: 'object' }, {}, () => SampleSub)
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
