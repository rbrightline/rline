import { str } from '@rline/type';
import { BaseEntity } from './BaseEntity';

describe('BaseEntity', () => {
  
  class Sample extends BaseEntity<Sample> {
    name = str();
  }
  const value = new Sample();

  it('keys() should return all keys', () => {
    expect(Object.keys(value)).toEqual([
      'id',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'active',
      'info',
      'name',
    ]);
  });
});
