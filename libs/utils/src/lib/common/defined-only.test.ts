import { definedOnly } from './defined-only';

describe('definedOnly', () => {
  it('should exclude properties with undefined values', () => {
    const input = { a: 1, b: undefined, c: 3 };
    const expectedOutput = { a: 1, c: 3 };
    expect(definedOnly(input)).toEqual(expectedOutput);
  });

  it('should return an empty object if all properties are undefined', () => {
    const input = { a: undefined, b: undefined };
    const expectedOutput = {};
    expect(definedOnly(input)).toEqual(expectedOutput);
  });

  it('should return the same object if no properties are undefined', () => {
    const input = { a: 1, b: 2, c: 3 };
    const expectedOutput = { a: 1, b: 2, c: 3 };
    expect(definedOnly(input)).toEqual(expectedOutput);
  });

  it('should handle an empty object', () => {
    const input = {};
    const expectedOutput = {};
    expect(definedOnly(input)).toEqual(expectedOutput);
  });

  it('should handle objects with different types of values', () => {
    const input = { a: 1, b: 'string', c: undefined, d: null, e: false };
    const expectedOutput = { a: 1, b: 'string', e: false };
    expect(definedOnly(input)).toEqual(expectedOutput);
  });
});
