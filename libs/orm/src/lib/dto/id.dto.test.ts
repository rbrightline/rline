import { describe, it, expect } from 'vitest';
import { IDDto } from './id.dto';

describe('IDDto', () => {
  it('should create an instance of IDDto', () => {
    const dto = new IDDto();
    expect(dto).toBeInstanceOf(IDDto);
  });

  it('should have an id property with a default undefined', () => {
    const dto = new IDDto();
    expect(dto.id).toBeUndefined();
  });

  it('should allow setting a valid id', () => {
    const dto = new IDDto();
    dto.id = 5;
    expect(dto.id).toBe(5);
  });
});
