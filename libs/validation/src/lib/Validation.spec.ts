import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './Validation';
import 'reflect-metadata';

describe('Validation', () => {
  class SubSample {
    @Validation({ type: 'string' }) name?: string;
  }
  function testInstance(options: any, value: any, errors?: string[]) {
    class Sample {
      @Validation({ ...options }, {}, () => SubSample) value: any;
    }
    const instance = plainToInstance(Sample, value);
    const rawErrors = validateSync(instance);
    const foundErrors = [
      ...new Set(
        rawErrors
          .map((e) => [
            ...Object.keys(e.constraints || {}),
            ...(e.children
              ?.map((e) => Object.keys(e.constraints || {}))
              .flat() || []),
          ])
          .flat()
      ),
    ];

    try {
      if (errors) {
        expect(errors.length).toBe(foundErrors.length);
        for (const e of errors) {
          expect(foundErrors.includes(e)).toBeTruthy();
        }
      } else {
        expect(foundErrors.length).toBe(0);
      }
    } catch (error) {
      console.log(instance, options, rawErrors);
      throw error;
    }
  }

  describe('null/undefined', () => {
    it.each`
      options                                         | value                   | errors
      ${{ type: 'string' }}                           | ${{}}                   | ${undefined}
      ${{ type: 'string' }}                           | ${{ value: undefined }} | ${undefined}
      ${{ type: 'string' }}                           | ${{ value: null }}      | ${undefined}
      ${{ type: 'number' }}                           | ${{}}                   | ${undefined}
      ${{ type: 'number' }}                           | ${{ value: undefined }} | ${undefined}
      ${{ type: 'number' }}                           | ${{ value: null }}      | ${undefined}
      ${{ type: 'integer' }}                          | ${{}}                   | ${undefined}
      ${{ type: 'integer' }}                          | ${{ value: undefined }} | ${undefined}
      ${{ type: 'integer' }}                          | ${{ value: null }}      | ${undefined}
      ${{ type: 'boolean' }}                          | ${{}}                   | ${undefined}
      ${{ type: 'boolean' }}                          | ${{ value: undefined }} | ${undefined}
      ${{ type: 'boolean' }}                          | ${{ value: null }}      | ${undefined}
      ${{ type: 'object', target: () => SubSample }}  | ${{}}                   | ${undefined}
      ${{ type: 'object', target: () => SubSample }}  | ${{ value: undefined }} | ${undefined}
      ${{ type: 'object', target: () => SubSample }}  | ${{ value: null }}      | ${undefined}
      ${{ type: 'array', items: { type: 'string' } }} | ${{}}                   | ${undefined}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: undefined }} | ${undefined}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: null }}      | ${undefined}
    `(
      'should validate $value with $options and throw $errors',
      ({ options, value, errors }) => {
        testInstance(options, value, errors);
      }
    );
  });

  describe('type', () => {
    it.each`
      options                                         | value              | errors
      ${{ type: 'string' }}                           | ${{ value: '1' }}  | ${undefined}
      ${{ type: 'string' }}                           | ${{ value: 1 }}    | ${['isString']}
      ${{ type: 'string' }}                           | ${{ value: true }} | ${['isString']}
      ${{ type: 'string' }}                           | ${{ value: {} }}   | ${['isString']}
      ${{ type: 'string' }}                           | ${{ value: [] }}   | ${['isString']}
      ${{ type: 'number' }}                           | ${{ value: 1 }}    | ${undefined}
      ${{ type: 'number' }}                           | ${{ value: '1' }}  | ${['isNumber']}
      ${{ type: 'number' }}                           | ${{ value: true }} | ${['isNumber']}
      ${{ type: 'number' }}                           | ${{ value: {} }}   | ${['isNumber']}
      ${{ type: 'number' }}                           | ${{ value: [] }}   | ${['isNumber']}
      ${{ type: 'integer' }}                          | ${{ value: 1 }}    | ${undefined}
      ${{ type: 'integer' }}                          | ${{ value: 2.3 }}  | ${['isInt']}
      ${{ type: 'integer' }}                          | ${{ value: '1' }}  | ${['isInt']}
      ${{ type: 'integer' }}                          | ${{ value: true }} | ${['isInt']}
      ${{ type: 'integer' }}                          | ${{ value: {} }}   | ${['isInt']}
      ${{ type: 'integer' }}                          | ${{ value: [] }}   | ${['isInt']}
      ${{ type: 'boolean' }}                          | ${{ value: true }} | ${undefined}
      ${{ type: 'boolean' }}                          | ${{ value: '1' }}  | ${['isBoolean']}
      ${{ type: 'boolean' }}                          | ${{ value: 1 }}    | ${['isBoolean']}
      ${{ type: 'boolean' }}                          | ${{ value: {} }}   | ${['isBoolean']}
      ${{ type: 'boolean' }}                          | ${{ value: [] }}   | ${['isBoolean']}
      ${{ type: 'object' }}                           | ${{ value: {} }}   | ${undefined}
      ${{ type: 'object' }}                           | ${{ value: '1' }}  | ${['isObject', 'nestedValidation']}
      ${{ type: 'object' }}                           | ${{ value: 1 }}    | ${['isObject', 'nestedValidation']}
      ${{ type: 'object' }}                           | ${{ value: true }} | ${['isObject', 'nestedValidation']}
      ${{ type: 'object' }}                           | ${{ value: [] }}   | ${['isObject']}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: [] }}   | ${undefined}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: '1' }}  | ${['isArray']}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: 1 }}    | ${['isArray', 'isString']}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: {} }}   | ${['isArray', 'isString']}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: true }} | ${['isArray', 'isString']}
    `(
      'should validate $value with $options and throw $errors',
      ({ options, value, errors }) => {
        testInstance(options, value, errors);
      }
    );
  });

  /**
   * - [ ] check the required array property
   */
  describe('required', () => {
    it.each`
      options                                                         | value                   | errors
      ${{ type: 'string', required: true }}                           | ${{ value: null }}      | ${['isNotEmpty', 'isString']}
      ${{ type: 'number', required: true }}                           | ${{ value: null }}      | ${['isNotEmpty', 'isNumber']}
      ${{ type: 'integer', required: true }}                          | ${{ value: null }}      | ${['isNotEmpty', 'isInt']}
      ${{ type: 'boolean', required: true }}                          | ${{ value: null }}      | ${['isNotEmpty', 'isBoolean']}
      ${{ type: 'object', required: true }}                           | ${{ value: null }}      | ${['isNotEmpty', 'isObject', 'nestedValidation']}
      ${{ type: 'array', required: true, items: { type: 'string' } }} | ${{ value: [] }}        | ${undefined}
      ${{ type: 'array', required: true, items: { type: 'string' } }} | ${{ value: ['some'] }}  | ${undefined}
      ${{ type: 'array', required: true, items: { type: 'string' } }} | ${{ value: null }}      | ${['isNotEmpty']}
      ${{ type: 'array', required: true, items: { type: 'string' } }} | ${{ value: undefined }} | ${['isNotEmpty']}
      ${{ type: 'array', required: true, items: { type: 'string' } }} | ${{ value: [1] }}       | ${['isString']}
      ${{ type: 'array', required: true, items: { type: 'string' } }} | ${{ value: [true] }}    | ${['isString']}
      ${{ type: 'array', required: true, items: { type: 'string' } }} | ${{ value: [{}] }}      | ${['isString']}
      ${{ type: 'array', required: true, items: { type: 'string' } }} | ${{ value: [[]] }}      | ${['isString']}
    `(
      'should validate $value with $options and throw $errors',
      ({ options, value, errors }) => {
        testInstance(options, value, errors);
      }
    );
  });
});
