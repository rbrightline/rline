import { plainToInstance } from 'class-transformer';
import { TransformValue } from './TransformValue';

describe('TransformValue', () => {
  it.each`
    value  | expected
    ${'1'} | ${1}
  `('should transform $value into $expected', ({ value, expected }) => {
    class Sample {
      @TransformValue()
      value: any;
    }
    const instance = plainToInstance(Sample, { value });
    console.log(instance);
    expect(instance.value).toBe(expected);
  });
});
