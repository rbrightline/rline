import { describe, it, expect } from 'vitest';
import { restPaths, RestApiPaths } from './rest-paths';

describe('restPaths', () => {
  it('should generate correct paths without prefix', () => {
    const name = 'user';
    const expected: RestApiPaths = {
      plural: 'users',
      singular: 'user',
      id: 'user/:id',
      plus: 'user/:id/plus',
      count: 'users/count',
      relation: 'user/:id/:relation',
      relationId: 'user/:id/:relation/:relationId',
    };

    const result = restPaths(name);
    expect(result).toEqual(expected);
  });

  it('should generate correct paths with prefix', () => {
    const name = 'user';
    const prefix = 'api';
    const expected: RestApiPaths = {
      plural: 'api/users',
      singular: 'api/user',
      id: 'api/user/:id',
      plus: 'api/user/:id/plus',
      count: 'api/users/count',
      relation: 'api/user/:id/:relation',
      relationId: 'api/user/:id/:relation/:relationId',
    };

    const result = restPaths(name, prefix);
    expect(result).toEqual(expected);
  });

  it('should handle different resource names', () => {
    const name = 'product';
    const expected: RestApiPaths = {
      plural: 'products',
      singular: 'product',
      id: 'product/:id',
      plus: 'product/:id/plus',
      count: 'products/count',
      relation: 'product/:id/:relation',
      relationId: 'product/:id/:relation/:relationId',
    };

    const result = restPaths(name);
    expect(result).toEqual(expected);
  });

  it('should handle empty prefix', () => {
    const name = 'order';
    const prefix = '';
    const expected: RestApiPaths = {
      plural: 'orders',
      singular: 'order',
      id: 'order/:id',
      plus: 'order/:id/plus',
      count: 'orders/count',
      relation: 'order/:id/:relation',
      relationId: 'order/:id/:relation/:relationId',
    };

    const result = restPaths(name, prefix);
    expect(result).toEqual(expected);
  });
});
