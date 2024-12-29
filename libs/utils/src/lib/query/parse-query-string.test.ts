import { describe, it, expect } from 'vitest';
import { parseQueryString } from './parse-query-string';

describe('parseQueryString', () => {
  const mockOperatorPicker = (operator: string, value: any) =>
    `${operator}:${value}`;

  it('should return null for invalid query string', () => {
    expect(parseQueryString('invalid-query', mockOperatorPicker)).toBeNull();
  });

  it('should parse a valid query string', () => {
    const queryString = 'name::eq::John';
    const result = parseQueryString(queryString, mockOperatorPicker);
    expect(result).toEqual({ name: 'eq:John' });
  });

  it('should NOT handle different operators', () => {
    const queryString = 'age::gt::30';
    const result = parseQueryString(queryString, mockOperatorPicker);
    expect(result).toEqual(null);
  });

  it('should handle different value types', () => {
    const queryString = 'active::eq::true';
    const result = parseQueryString(queryString, mockOperatorPicker);
    expect(result).toEqual({ active: 'eq:true' });
  });

  it('should return null if query string is empty', () => {
    expect(parseQueryString('', mockOperatorPicker)).toBeNull();
  });
});
