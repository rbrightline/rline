// [ ] create tests for Property decorator
describe('Common Property', () => {
  it.each`
    value | options | errors
    ${{}} | ${{}}   | ${undefined}
  `(
    'should validate the $value with $options and throw $errors',
    ({ value, options, errors }) => {
      expect(value).toBeUndefined();
      expect(options).toBeUndefined();
      expect(errors).toBeUndefined();
    }
  );
});
