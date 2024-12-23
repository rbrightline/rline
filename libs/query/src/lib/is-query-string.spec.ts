import {
  isQueryString,
  QUERY_NUMBER_EXP,
  QUERY_STRING_EXP,
} from './is-query-string';

describe('Exp', () => {
  describe('query string exp', () => {
    it.each`
      query             | status
      ${undefined}      | ${false}
      ${''}             | ${false}
      ${'  '}           | ${false}
      ${'  ::'}         | ${false}
      ${'  ::  '}       | ${false}
      ${'  '}           | ${false}
      ${'eq::    '}     | ${true}
      ${'::some '}      | ${false}
      ${'eq::some'}     | ${true}
      ${'sw:: some  '}  | ${true}
      ${'ew:: some  '}  | ${true}
      ${'cn:: some  '}  | ${true}
      ${'nsw:: some  '} | ${true}
      ${'new:: some  '} | ${true}
      ${'ncn:: some  '} | ${true}
      ${'mt:: some  '}  | ${false}
      ${'lt:: some  '}  | ${false}
      ${'lte:: some  '} | ${false}
      ${'mte:: some  '} | ${false}
    `('$query  test should return $status', ({ query, status }) => {
      expect(QUERY_STRING_EXP.test(query)).toBe(status);
    });
  });
  describe('query number exp', () => {
    it.each`
      query             | status
      ${undefined}      | ${false}
      ${''}             | ${false}
      ${'  '}           | ${false}
      ${'  ::'}         | ${false}
      ${'  ::  '}       | ${false}
      ${'  '}           | ${false}
      ${'eq::    '}     | ${false}
      ${'::some '}      | ${false}
      ${'eq::some'}     | ${false}
      ${'eq::some  '}   | ${false}
      ${'eq:: some  '}  | ${false}
      ${'neq:: some  '} | ${false}
      ${'sw:: some  '}  | ${false}
      ${'ew:: some  '}  | ${false}
      ${'cn:: some  '}  | ${false}
      ${'nsw:: some  '} | ${false}
      ${'new:: some  '} | ${false}
      ${'ncn:: some  '} | ${false}
      ${'eq::1'}        | ${true}
      ${'mt::1'}        | ${true}
      ${'lt::1'}        | ${true}
      ${'mte::1'}       | ${true}
      ${'lte::1'}       | ${true}
    `('$query  test should return $status', ({ query, status }) => {
      expect(QUERY_NUMBER_EXP.test(query)).toBe(status);
    });
  });
  describe('isQueryString', () => {
    it.each`
      query             | status
      ${undefined}      | ${false}
      ${''}             | ${false}
      ${'  '}           | ${false}
      ${'  ::'}         | ${false}
      ${'  ::  '}       | ${false}
      ${'  '}           | ${false}
      ${'eq::    '}     | ${true}
      ${'::some '}      | ${false}
      ${'eq::some'}     | ${true}
      ${'eq::some  '}   | ${true}
      ${'eq:: some  '}  | ${true}
      ${'neq:: some  '} | ${true}
      ${'sw:: some  '}  | ${true}
      ${'ew:: some  '}  | ${true}
      ${'cn:: some  '}  | ${true}
      ${'nsw:: some  '} | ${true}
      ${'new:: some  '} | ${true}
      ${'ncn:: some  '} | ${true}
      ${'eq::1'}        | ${true}
      ${'mt::1'}        | ${true}
      ${'lt::1'}        | ${true}
      ${'mte::1'}       | ${true}
      ${'lte::1'}       | ${true}
      ${''}             | ${false}
      ${'  '}           | ${false}
      ${'  ::'}         | ${false}
      ${'  ::  '}       | ${false}
      ${'  '}           | ${false}
      ${'::some '}      | ${false}
      ${'eq::some'}     | ${true}
      ${'sw:: some  '}  | ${true}
      ${'ew:: some  '}  | ${true}
      ${'cn:: some  '}  | ${true}
      ${'nsw:: some  '} | ${true}
      ${'new:: some  '} | ${true}
      ${'ncn:: some  '} | ${true}
      ${'mt:: some  '}  | ${false}
      ${'lt:: some  '}  | ${false}
      ${'lte:: some  '} | ${false}
      ${'mte:: some  '} | ${false}
    `('$query  test should return $status', ({ query, status }) => {
      expect(isQueryString(query)).toBe(status);
    });
  });
});
