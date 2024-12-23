import { parseQueryString } from './parse-query-string';

describe('parseQueryString', () => {
  it.each`
    query          | result
    ${''}          | ${undefined}
    ${'  '}        | ${undefined}
    ${'  ::'}      | ${undefined}
    ${'::'}        | ${undefined}
    ${'eq::'}      | ${undefined}
    ${'::some'}    | ${undefined}
    ${'eq:some'}   | ${undefined}
    ${'eq::some'}  | ${{ operator: 'eq', value: 'some' }}
    ${'neq::some'} | ${{ operator: 'neq', value: 'some' }}
    ${'cn::some'}  | ${{ operator: 'cn', value: 'some' }}
    ${'ncn::some'} | ${{ operator: 'ncn', value: 'some' }}
    ${'sw::some'}  | ${{ operator: 'sw', value: 'some' }}
    ${'nsw::some'} | ${{ operator: 'nsw', value: 'some' }}
    ${'ew::some'}  | ${{ operator: 'ew', value: 'some' }}
    ${'new::some'} | ${{ operator: 'new', value: 'some' }}
    ${'mt::1'}     | ${{ operator: 'mt', value: '1' }}
    ${'mte::1'}    | ${{ operator: 'mte', value: '1' }}
    ${'lt::1'}     | ${{ operator: 'lt', value: '1' }}
    ${'lte::1'}    | ${{ operator: 'lte', value: '1' }}
    ${'mt::a'}     | ${undefined}
    ${'mte::a'}    | ${undefined}
    ${'lt::a'}     | ${undefined}
    ${'lte::a'}    | ${undefined}
  `('should parse $query into $result', ({ query, result }) => {
    expect(parseQueryString(query)).toEqual(result);
  });
});
