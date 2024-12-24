import { Exclude, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Property } from './Property';
import 'reflect-metadata';

describe('Property', () => {
  class SubSample {
    @Property({ type: 'string' })
    name?: string;
  }
  function testInstance(options: any, value: any, errors?: string[]) {
    @Exclude()
    class Sample {
      @Property({ ...options }, () => SubSample) value: any;
    }
    const instance = plainToInstance(Sample, value);
    const foundErrors = [
      ...new Set(
        validateSync(instance)
          .map((e) => Object.keys(e.constraints || {}))
          .flat()
      ),
    ];

    try {
      if (errors) {
        expect(errors.length).toBe(foundErrors.length);
      } else {
        expect(foundErrors.length).toBe(0);
      }
    } catch (error) {
      console.log(foundErrors);
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
      ${{ type: 'object' }}                           | ${{}}                   | ${undefined}
      ${{ type: 'object' }}                           | ${{ value: undefined }} | ${undefined}
      ${{ type: 'object' }}                           | ${{ value: null }}      | ${undefined}
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

  // [ ] required array validation does not work!
  describe('required', () => {
    it.each`
      options                                                         | value              | errors
      ${{ type: 'string', required: true }}                           | ${{ value: null }} | ${['isNotEmpty', 'isString']}
      ${{ type: 'number', required: true }}                           | ${{ value: null }} | ${['isNotEmpty', 'isNumber']}
      ${{ type: 'integer', required: true }}                          | ${{ value: null }} | ${['isNotEmpty', 'isInt']}
      ${{ type: 'boolean', required: true }}                          | ${{ value: null }} | ${['isNotEmpty', 'isBoolean']}
      ${{ type: 'object', required: true }}                           | ${{ value: null }} | ${['isNotEmpty', 'isObject', 'nestedValidation']}
      ${{ type: 'array', required: true, items: { type: 'string' } }} | ${{ value: null }} | ${undefined}
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
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: {} }}   | ${['isArray', 'isString']}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: 1 }}    | ${['isArray', 'isString']}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: true }} | ${['isArray', 'isString']}
      ${{ type: 'array', items: { type: 'string' } }} | ${{ value: '1' }}  | ${['isArray']}
    `(
      'should validate $value with $options and throw $errors',
      ({ options, value, errors }) => {
        testInstance(options, value, errors);
      }
    );
  });

  describe('string', () => {
    it.each`
      options                                           | value                | errors
      ${{ type: 'string' }}                             | ${{}}                | ${undefined}
      ${{ type: 'string' }}                             | ${{ value: '' }}     | ${undefined}
      ${{ type: 'string', minLength: 1, maxLength: 2 }} | ${{ value: '1' }}    | ${undefined}
      ${{ type: 'string', minLength: 1, maxLength: 2 }} | ${{ value: '12' }}   | ${undefined}
      ${{ type: 'string', minLength: 1, maxLength: 2 }} | ${{ value: '' }}     | ${['minLength']}
      ${{ type: 'string', minLength: 1, maxLength: 2 }} | ${{ value: '123' }}  | ${['maxLength']}
      ${{ type: 'string', format: 'email' }}            | ${{}}                | ${undefined}
      ${{ type: 'string', format: 'email' }}            | ${{ value: 'some' }} | ${['isEmail']}
      ${{ type: 'string', format: 'uuid' }}             | ${{ value: 'some' }} | ${['isUuid']}
      ${{ type: 'string', format: 'password' }}         | ${{ value: 'some' }} | ${['isStrongPassword']}
    `(
      'should validate $value with $options and throw $errors',
      ({ options, value, errors }) => {
        testInstance(options, value, errors);
      }
    );
  });

  describe('number', () => {
    it.each`
      options                                        | value             | errors
      ${{ type: 'number' }}                          | ${{}}             | ${undefined}
      ${{ type: 'number' }}                          | ${{ value: '' }}  | ${['isNumber']}
      ${{ type: 'number', minimum: -1, maximum: 2 }} | ${{ value: 2 }}   | ${undefined}
      ${{ type: 'number', minimum: -1, maximum: 2 }} | ${{ value: 1 }}   | ${undefined}
      ${{ type: 'number', minimum: -1, maximum: 2 }} | ${{ value: 1.4 }} | ${undefined}
      ${{ type: 'number', minimum: -1, maximum: 2 }} | ${{ value: -2 }}  | ${['min']}
      ${{ type: 'number', minimum: -1, maximum: 2 }} | ${{ value: 3 }}   | ${['max']}
      ${{ type: 'integer' }}                         | ${{ value: '' }}  | ${['isInt']}
      ${{ type: 'integer' }}                         | ${{ value: 3.3 }} | ${['isInt']}
    `(
      'should validate $value with $options and throw $errors',
      ({ options, value, errors }) => {
        testInstance(options, value, errors);
      }
    );
  });
  describe('boolean', () => {
    it.each`
      options                | value               | errors
      ${{ type: 'boolean' }} | ${{}}               | ${undefined}
      ${{ type: 'boolean' }} | ${{ value: true }}  | ${undefined}
      ${{ type: 'boolean' }} | ${{ value: false }} | ${undefined}
    `(
      'should validate $value with $options and throw $errors',
      ({ options, value, errors }) => {
        testInstance(options, value, errors);
      }
    );
  });
});
