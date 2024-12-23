import { parseOrderString } from './parse-order-string';

describe('parseOrderString', () => {
  it.each`
    query                 | expected
    ${''}                 | ${undefined}
    ${'  '}               | ${undefined}
    ${' property::  '}    | ${undefined}
    ${' ::  '}            | ${undefined}
    ${' property::asc  '} | ${undefined}
  `('should parse $query into $expected', ({ query, expected }) => {
    expect(parseOrderString(query)).toEqual(expected);
  });
});
