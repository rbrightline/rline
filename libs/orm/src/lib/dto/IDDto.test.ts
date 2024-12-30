import { describe, it, expect } from 'vitest';
import { IDDto } from './IDDto';

describe('IDDto', () => {
  it('should create an instance of IDDto', () => {
    const dto = new IDDto();
    expect(dto).toBeInstanceOf(IDDto);
  });

  it('should have an id property with a default value of 0', () => {
    const dto = new IDDto();
    expect(dto.id).toBeNull();
  });

  it('should allow setting a valid id', () => {
    const dto = new IDDto();
    dto.id = 5;
    expect(dto.id).toBe(5);
  });
});
