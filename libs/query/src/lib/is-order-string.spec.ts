import { ORDER_EXP } from './is-order-string';

describe('isOrderString', () => {
  it.each`
    query               | expected
    ${''}               | ${false}
    ${' '}              | ${false}
    ${' ::'}            | ${false}
    ${' property::asc'} | ${false}
    ${' property ::-1'} | ${false}
    ${'property::asc'}  | ${true}
    ${'property::desc'} | ${true}
    ${'property::1'}    | ${true}
    ${'property::-1'}   | ${true}
    ${' property::ASC'} | ${false}
    ${' property ::-1'} | ${false}
    ${'property::ASC'}  | ${true}
    ${'property::DESC'} | ${true}
    ${'property::1'}    | ${true}
    ${'property::-1'}   | ${true}
  `('should test $query and return $expected', ({ query, expected }) => {
    expect(ORDER_EXP.test(query)).toBe(expected);
  });
});
