import { IntegerPropertyOptions } from '@rline/property';
import { Column } from 'typeorm';

export function IntegerColumn(
  options: IntegerPropertyOptions
): PropertyDecorator {
  return (t, p) => {
    Column({ type: 'integer', nullable: options.required !== true })(t, p);
  };
}
