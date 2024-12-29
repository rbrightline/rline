import { names } from './names';

describe('names', () => {
  it('should return correct cases for a single word', () => {
    const result = names('example');
    expect(result).toEqual({
      camelCase: 'example',
      constCase: 'EXAMPLE',
      kebabCase: 'example',
      pascalCase: 'example',
      snakeCase: 'example',
      titleCase: 'example',
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
    const result = names('');
    expect(result).toEqual({
      camelCase: '',
      constCase: '',
      kebabCase: '',
      pascalCase: '',
      snakeCase: '',
      titleCase: '',
    });
  });

  it('should handle strings with multiple spaces', () => {
    const result = names('example   name');
    expect(result).toEqual({
      camelCase: 'exampleName',
      constCase: 'EXAMPLE___NAME',
      kebabCase: 'example---name',
      pascalCase: 'examplename',
      snakeCase: 'example___name',
      titleCase: 'example   name',
    });
  });

  it('should handle strings with special characters', () => {
    const result = names('example@name!');
    expect(result).toEqual({
      camelCase: 'example@name!',
      constCase: 'EXAMPLE@NAME!',
      kebabCase: 'example@name!',
      pascalCase: 'example@name!',
      snakeCase: 'example@name!',
      titleCase: 'example@name!',
    });
  });

  it('should handle strings with numbers', () => {
    const result = names('example123 name456');

    console.log(result);
    
    expect(result).toEqual({
      camelCase: 'example123Name456',
      constCase: 'EXAMPLE123_NAME456',
      kebabCase: 'example123-name456',
      pascalCase: 'Example123Name456',
      snakeCase: 'example123_name456',
      titleCase: 'Example123 Name456',
    });
  });
});
