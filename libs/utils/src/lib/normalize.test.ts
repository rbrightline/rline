import { normalize } from './normalize';

describe('normalize', () => {
  it('should add a space before uppercase letters and capitalize the first letter', () => {
    expect(normalize('helloWorld')).toBe('Hello World');
    expect(normalize('normalizeFunction')).toBe('Normalize Function');
  });

  it('should handle strings with no uppercase letters', () => {
    expect(normalize('helloworld')).toBe('Helloworld');
  });

  it('should handle strings that are already normalized', () => {
    expect(normalize('Hello_World')).toBe('Hello World');
  });

  it('should handle empty strings', () => {
    expect(() => normalize('')).toThrow();
  });

  it('should handle single character strings', () => {
    expect(normalize('a')).toBe('A');
    expect(normalize('A')).toBe('A');
  });

  it('should handle strings with multiple uppercase letters', () => {
    expect(normalize('helloWorldAgain')).toBe('Hello World Again');
  });
});
