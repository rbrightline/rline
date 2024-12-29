import { names } from './names';

describe('names', () => {
  it('should return correct cases for a single word', () => {
    const result = names('example');
    expect(result).toEqual({
      camelCase: 'example',
      constCase: 'EXAMPLE',
      kebabCase: 'example',
      pascalCase: 'Example',
      snakeCase: 'example',
      titleCase: 'Example',
    });
  });

  it('should return correct cases for multiple words', () => {
    const result = names('example name');
    expect(result).toEqual({
      camelCase: 'exampleName',
      constCase: 'EXAMPLE_NAME',
      kebabCase: 'example-name',
      pascalCase: 'ExampleName',
      snakeCase: 'example_name',
      titleCase: 'Example Name',
    });
  });

  it('should handle empty string', () => {
    expect(() => names('')).toThrow();
  });

  it('should handle strings with multiple spaces', () => {
    const result = names('example   name');
    expect(result).toEqual({
      camelCase: 'exampleName',
      constCase: 'EXAMPLE_NAME',
      kebabCase: 'example-name',
      pascalCase: 'ExampleName',
      snakeCase: 'example_name',
      titleCase: 'Example Name',
    });
  });
});
