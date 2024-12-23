import { QueryOperator } from './query-operator';
import { toQueryString } from './to-query-string';

describe('toQueryString', () => {
  it.each`
    queryItem                       | query
    ${{}}                           | ${undefined}
    ${{ operator: '', value: '' }}     | ${undefined}
    ${{ operator: 'eq', value: '' }}   | ${undefined}
    ${{ operator: 'sw', value: '' }}   | ${undefined}
    ${{ operator: 'mt', value: '' }}   | ${undefined}
    ${{ operator: 'sw', value: '1' }}  | ${'sw::1'}
    ${{ operator: 'mt', value: 's' }}  | ${undefined}
    ${{ operator: 'mt', value: '1' }}  | ${'mt::1'}
    ${{ operator: 'mte', value: '1' }} | ${'mte::1'}
  `('$queryItem should stringify $query', ({ queryItem, query }) => {
    const result = toQueryString(queryItem);
    expect(result).toBe(query);
  });
});
