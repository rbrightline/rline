import { repeat } from './repeat';

describe('repeat', () => {
  it('should generate an array of specified length', () => {
    const result = repeat(5, (i) => i);
    expect(result).toHaveLength(5);
  });

  it('should invoke the handler function the correct number of times', () => {
    const handler = vi.fn((i: any) => i);
    repeat(3, handler);
    expect(handler).toHaveBeenCalledTimes(3);
  });

  it('should generate an array with correct values', () => {
    const result = repeat(4, (i) => i * 2);
    expect(result).toEqual([0, 2, 4, 6]);
  });

  it('should handle zero count correctly', () => {
    const result = repeat(0, (i) => i);
    expect(result).toEqual([]);
  });

  it('should handle negative count correctly', () => {
    const result = repeat(-1, (i) => i);
    expect(result).toEqual([]);
  });
});
