import { isQueryString } from './is-query-string';

describe('isQueryString', () => {
  it('should return true for valid query strings matching QUERY_STRING_EXP', () => {
    expect(isQueryString('name::eq::John')).toBe(true);
    expect(isQueryString('status::cn::active')).toBe(true);
    expect(isQueryString('title::sw::Mr')).toBe(true);
    expect(isQueryString('description::ew::end')).toBe(true);
    expect(isQueryString('category::neq::electronics')).toBe(true);
    expect(isQueryString('tag::ncn::urgent')).toBe(true);
    expect(isQueryString('prefix::nsw::pre')).toBe(true);
    expect(isQueryString('suffix::new::post')).toBe(true);
    expect(isQueryString('age::gt::30')).toBe(false);
  });

  it('should return true for valid query strings matching QUERY_NUMBER_EXP', () => {
    expect(isQueryString('age::eq::30')).toBe(true);
    expect(isQueryString('price::mt::100')).toBe(true);
    expect(isQueryString('quantity::lt::50')).toBe(true);
    expect(isQueryString('score::lte::75')).toBe(true);
    expect(isQueryString('rank::mte::10')).toBe(true);
    expect(isQueryString('level::neq::5')).toBe(true);
  });

  it('should return false for invalid query strings', () => {
    expect(isQueryString('invalid::operator::value')).toBe(false);
    expect(isQueryString('name::eq::')).toBe(false);
    expect(isQueryString('::eq::value')).toBe(false);
    expect(isQueryString('name::eq::value::extra')).toBe(false);
    expect(isQueryString('name::unknown::value')).toBe(false);
    expect(
      isQueryString('name::eq::value with spaces exceeding thirty characters')
    ).toBe(false);
    expect(isQueryString('name::eq::value_with_special_chars!@#')).toBe(false);
  });

  it('should return false for non-string inputs', () => {
    expect(isQueryString(null as any)).toBe(false);
    expect(isQueryString(undefined as any)).toBe(false);
    expect(isQueryString(123 as any)).toBe(false);
    expect(isQueryString({} as any)).toBe(false);
    expect(isQueryString([] as any)).toBe(false);
  });
});
