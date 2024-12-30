


describe('experiment', () => {
  it('should work', () => {
    class A {
      key?: string;
      private _value?: string;
    }

    console.log(Object.keys(new A()));
  });
});
