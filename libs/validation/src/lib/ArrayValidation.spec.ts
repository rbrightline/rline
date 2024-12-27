import { plainToInstance } from 'class-transformer';
import { ArrayValidationOptions as O } from './ArrayValidationOptions';
import { validateTestInstance } from './__testHelper';
import { IsOptional } from 'class-validator';
import 'reflect-metadata';
import { Validation } from './Validation';

describe('ArrayValiation', () => {
  it.each`
    options                                                                         | data                                     | errors
    ${{ items: { type: 'string' } } as O}                                           | ${{}}                                    | ${undefined}
    ${{ items: { type: 'string' } } as O}                                           | ${{}}                                    | ${undefined}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: null }}                       | ${undefined}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: undefined }}                  | ${undefined}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: [] }}                         | ${undefined}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: ['some'] }}                   | ${undefined}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: [1] }}                        | ${['isString']}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: [1] }}                        | ${['isString']}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: [true] }}                     | ${['isString']}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: [{}] }}                       | ${['isString']}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: [null] }}                     | ${['isString']}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: [undefined] }}                | ${['isString']}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: 'some' }}                     | ${['isArray']}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: 1 }}                          | ${['isArray', 'isString']}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: true }}                       | ${['isArray', 'isString']}
    ${{ items: { type: 'string' } } as O}                                           | ${{ value: {} }}                         | ${['isArray', 'isString']}
    ${{ maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1] }}                        | ${['arrayMinSize']}
    ${{ maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1, 2, 3, 4] }}               | ${['arrayMaxSize']}
    ${{ maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1, 2] }}                     | ${undefined}
    ${{ maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1, 2, 3] }}                  | ${undefined}
    ${{ maxSize: 3, minSize: 2, items: { type: 'number' } } as O}                   | ${{ value: [1, 'some', 3] }}             | ${['isNumber']}
    ${{ maxSize: 3, minSize: 2, items: { type: 'integer' } } as O}                  | ${{ value: [1, 'some', 3] }}             | ${['isInt']}
    ${{ maxSize: 3, minSize: 2, items: { type: 'integer' } } as O}                  | ${{ value: [1, 3.5, 3] }}                | ${['isInt']}
    ${{ maxSize: 3, minSize: 2, items: { type: 'integer' } } as O}                  | ${{ value: [{}, {}] }}                   | ${['isInt']}
    ${{ maxSize: 3, minSize: 2, items: { type: 'object' } } as O}                   | ${{ value: [{}, {}] }}                   | ${undefined}
    ${{ maxSize: 3, minSize: 2, items: { type: 'boolean' } } as O}                  | ${{ value: [{}, {}] }}                   | ${['isBoolean']}
    ${{ maxSize: 3, minSize: 2, default: [true], items: { type: 'boolean' } } as O} | ${{ value: undefined }}                  | ${['arrayMinSize']}
    ${{ maxSize: 3, minSize: 2, default: [true], items: { type: 'boolean' } } as O} | ${{ value: null }}                       | ${['arrayMinSize']}
    ${{ maxSize: 3, minSize: 2, default: [1], items: { type: 'boolean' } } as O}    | ${{ value: null }}                       | ${['isBoolean', 'arrayMinSize']}
    ${{ maxSize: 3, minSize: 2, items: { type: 'boolean', default: true } } as O}   | ${{ value: [null, null, null] }}         | ${['isBoolean']}
    ${{ maxSize: 3, minSize: 2, items: { type: 'boolean', default: true } } as O}   | ${{ value: [null, null, null, null] }}   | ${['isBoolean', 'arrayMaxSize']}
    ${{ format: 'string', items: { type: 'string' } } as O}                         | ${{ value: '["some", "goes", "here"]' }} | ${undefined}
  `(
    'should validate $data with $options and throw $errors',
    ({ options, data, errors }) => {
      class SubSample {
        @IsOptional()
        value: any;
      }
      class Sample {
        @Validation({ ...options, type: 'array' }, {}, () => SubSample)
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
