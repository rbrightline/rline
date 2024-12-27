import { plainToInstance } from 'class-transformer';
import { DefaultValueTransform } from './DefaultValueTransform';

describe('DefaultValueTransform', () => {
  it.each`
    value                   | defaultValue | expected
    ${{ value: {} }}        | ${1}         | ${{ value: {} }}
    ${{ value: true }}      | ${1}         | ${{ value: true }}
    ${{ value: false }}     | ${1}         | ${{ value: false }}
    ${{ value: -100 }}      | ${1}         | ${{ value: -100 }}
    ${{ value: 100 }}       | ${1}         | ${{ value: 100 }}
    ${{ value: undefined }} | ${1}         | ${{ value: 1 }}
    ${{ value: undefined }} | ${true}      | ${{ value: true }}
    ${{ value: undefined }} | ${{}}        | ${{ value: {} }}
    ${{ value: undefined }} | ${'Some'}    | ${{ value: 'Some' }}
    ${{ value: null }}      | ${1}         | ${{ value: 1 }}
    ${{ value: null }}      | ${true}      | ${{ value: true }}
    ${{ value: null }}      | ${{}}        | ${{ value: {} }}
    ${{ value: null }}      | ${'Some'}    | ${{ value: 'Some' }}
  `(
    'should transform $value with the default value $defaultValue and return $expected',
    ({ value, defaultValue, expected }) => {
      class Sample {
        @DefaultValueTransform(defaultValue)
        value: any;
      }
      const transformed = plainToInstance(Sample, value);
      expect(transformed).toEqual(expected);
    }
  );
});
