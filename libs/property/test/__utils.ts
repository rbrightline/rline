/* eslint-disable @typescript-eslint/no-explicit-any */
import { Exclude, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Property, PropertyOptions } from '../src';

@Exclude()
export class TestClass {
  @Property({ type: 'string' })
  value: any;
}

export function createTestClassInstance(
  options: PropertyOptions,
  value: TestClass
): TestClass {
  @Exclude()
  class __TestClass {
    @Property(options)
    value: any;
  }

  return plainToInstance(__TestClass, value);
}

export function valiteTestClass(instance: TestClass): string[] {
  return validateSync(instance)
    .map((e) => {
      return [
        ...Object.keys(e.constraints || {}),
        ...(e.children?.map((c) => Object.keys(c.constraints || {})).flat() ||
          []),
      ];
    })
    .flat();
}
