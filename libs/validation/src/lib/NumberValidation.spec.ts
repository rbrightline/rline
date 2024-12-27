import { plainToInstance } from 'class-transformer';
import { Validation } from './Validation';
import { validateTestInstance } from './__testHelper';

describe('NumberValidation', () => {
  it.each`
    options                                           | data                     | errors
    ${{}}                                             | ${{ value: undefined }}  | ${undefined}
    ${{}}                                             | ${{ value: null }}       | ${undefined}
    ${{}}                                             | ${{ value: 'some' }}     | ${['isNumber']}
    ${{}}                                             | ${{ value: true }}       | ${['isNumber']}
    ${{}}                                             | ${{ value: {} }}         | ${['isNumber']}
    ${{ required: true }}                             | ${{ value: undefined }}  | ${['isNotEmpty', 'isNumber']}
    ${{ required: true }}                             | ${{ value: null }}       | ${['isNotEmpty', 'isNumber']}
    ${{}}                                             | ${{ value: '100' }}      | ${['isNumber']}
    ${{ format: 'string' }}                           | ${{ value: '100' }}      | ${undefined}
    ${{ format: 'string' }}                           | ${{ value: '100.500' }}  | ${undefined}
    ${{ minimum: 0, maximum: 100, format: 'string' }} | ${{ value: '100.500' }}  | ${['max']}
    ${{ minimum: 0, maximum: 100, format: 'string' }} | ${{ value: '-100.500' }} | ${['min']}
  `(
    'should validate $data with $options and throw $errors',
    ({ options, data, errors }) => {
      class Sample {
        @Validation({ ...options, type: 'number' })
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
