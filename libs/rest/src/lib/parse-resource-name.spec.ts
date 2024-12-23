import { parseResourceName } from './parse-resource-name';

describe('parseResourceName', () => {
  it.each`
    name                      | singular         | plural
    ${'SampleController'}     | ${'sample'}      | ${'samples'}
    ${'CategoryController'}   | ${'category'}    | ${'categories'}
    ${'PriceLevelController'} | ${'price-level'} | ${'price-levels'}
  `(
    'should parse $name into $singular and $plural',
    ({ name, singular, plural }) => {
      const r = parseResourceName(name);

      expect(r.singular).toBe(singular);
      expect(r.plural).toBe(plural);
    }
  );
});
