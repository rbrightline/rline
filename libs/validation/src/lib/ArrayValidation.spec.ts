import { plainToInstance } from 'class-transformer';
import { ArrayValidation } from './ArrayValidation';
import { ArrayValidationOptions as O } from './ArrayValidationOptions';
import { validateTestInstance } from './__testHelper';
import { IsOptional } from 'class-validator';
import 'reflect-metadata';

describe('ArrayValiation', () => {
  it.each`
    options                                                                                        | data                                   | errors
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{}}                                  | ${undefined}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{}}                                  | ${undefined}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: null }}                     | ${undefined}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: undefined }}                | ${undefined}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: [] }}                       | ${undefined}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: ['some'] }}                 | ${undefined}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: [1] }}                      | ${['isString']}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: [true] }}                   | ${['isString']}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: [{}] }}                     | ${['isString']}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: [null] }}                   | ${['isString']}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: [undefined] }}              | ${['isString']}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: 'some' }}                   | ${['isArray']}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: 1 }}                        | ${['isArray', 'isString']}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: true }}                     | ${['isArray', 'isString']}
    ${{ type: 'array', items: { type: 'string' } } as O}                                           | ${{ value: {} }}                       | ${['isArray', 'isString']}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1] }}                      | ${['arrayMinSize']}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1, 2, 3, 4] }}             | ${['arrayMaxSize']}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1, 2] }}                   | ${undefined}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1, 2, 3] }}                | ${undefined}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1, 'some', 3] }}           | ${['isNumber']}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'integer' } } as O}                  | ${{ value: [1, 'some', 3] }}           | ${['isInt']}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'integer' } } as O}                  | ${{ value: [1, 3.5, 3] }}              | ${['isInt']}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'integer' } } as O}                  | ${{ value: [{}, {}] }}                 | ${['isInt']}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'object' } } as O}                   | ${{ value: [{}, {}] }}                 | ${undefined}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'boolean' } } as O}                  | ${{ value: [{}, {}] }}                 | ${['isBoolean']}
    ${{ type: 'array', maxSize: 3, minSize: 2, default: [true], items: { type: 'boolean' } } as O} | ${{ value: undefined }}                | ${['arrayMinSize']}
    ${{ type: 'array', maxSize: 3, minSize: 2, default: [true], items: { type: 'boolean' } } as O} | ${{ value: null }}                     | ${['arrayMinSize']}
    ${{ type: 'array', maxSize: 3, minSize: 2, default: [1], items: { type: 'boolean' } } as O}    | ${{ value: null }}                     | ${['isBoolean', 'arrayMinSize']}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'boolean', default: true } } as O}   | ${{ value: [null, null, null] }}       | ${['isBoolean']}
    ${{ type: 'array', maxSize: 3, minSize: 2, items: { type: 'boolean', default: true } } as O}   | ${{ value: [null, null, null, null] }} | ${['isBoolean', 'arrayMaxSize']}
  `(
    'should validate $data with $options and throw $errors',
    ({ options, data, errors }) => {
      class SubSample {
        @IsOptional()
        value: any;
      }
      class Sample {
        @ArrayValidation(options, () => SubSample)
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
