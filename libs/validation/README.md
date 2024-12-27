# validation

Validation library built on top of `class-validator` and `class-transformer` libraries

## Examples

```typescript
class Sample {
  @Validation({ type: 'string', minLength: 1, maxLegnth: 100 })
  stringValue: string;

  @Validation({ type: 'string', format: 'email' })
  emailValue: string;

  @Validation({ type: 'string', format: 'password' })
  passwordValue: string;

  @Validation({ type: 'number' })
  numberValue: number;

  @Validation({ type: 'integer' })
  integerValue: number;

  @Validation({ type: 'boolean' })
  booleanValue: number;

  @Validation({ type: 'object' }, {}, () => TargetObject)
  objectValue: TargetObject;

  @Validation({ type: 'array', items: { type: 'string' } })
  arrayStringValue: string[];

  @Validation({ type: 'array', items: { type: 'number' } })
  arrayNumberValue: number[];

  // Transform the string-number into number, then validate
  @Validation({ type: 'number', format: 'string' })
  numberStringValue: number;

  // Transform the string-boolean into boolean, then validate
  @Validation({ type: 'boolean', format: 'string' })
  booleanStringValue: boolean;

  // Transform the string-object into object, then validate
  @Validation({ type: 'object', format: 'string' })
  objectStringValue: any;
}
```
