import { normalize } from './normalize';

describe('normalize', () => {
  it('should normalize a string by adding spaces before uppercase letters and converting to lowercase', () => {
    const result = normalize('HelloWorld');
    expect(result).toBe('hello world');
  });

  it('should normalize a string with underscores, hyphens, and periods by replacing them with spaces', () => {
    const result = normalize('Hello_World-Test.String');
    expect(result).toBe('hello world test string');
  });

  it('should normalize a string with multiple spaces by reducing them to a single space', () => {
    const result = normalize('Hello   World');
    expect(result).toBe('hello world');
  });

  it('should throw an error if the input string is invalid according to the default validator', () => {
    expect(() => normalize('Hello@World')).toThrow();
  });

  it('should use the custom preInputValidator if provided', () => {
    const customValidator = (value: string) => value.length > 5;
    expect(() => normalize('Hello', customValidator)).toThrow();
    const result = normalize('HelloWorld', customValidator);
    expect(result).toBe('hello world');
  });
});
