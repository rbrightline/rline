import { toOrderString } from './to-order-string';

describe('toOrderString', () => {
  it.each`
    queryItem                                      | query
    ${{}}                                          | ${undefined}
    ${{ property: 'some' }}                        | ${undefined}
    ${{ direction: 'ASC' }}                        | ${undefined}
    ${{ property: '', direction: '' }}             | ${undefined}
    ${{ property: 'property', direction: 'ASC' }}  | ${'property::ASC'}
    ${{ property: 'property', direction: 'DESC' }} | ${'property::DESC'}
    ${{ property: 'property', direction: 'asc' }}  | ${'property::asc'}
    ${{ property: 'property', direction: 'desc' }} | ${'property::desc'}
    ${{ property: 'property', direction: '-1' }}   | ${'property::-1'}
    ${{ property: 'property', direction: '1' }}    | ${'property::1'}
  `('$queryItem should stringify $query', ({ queryItem, query }) => {
    const result = toOrderString(queryItem);
    expect(result).toBe(query);
  });
});
