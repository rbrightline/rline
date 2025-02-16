import { StringPropertyOptions } from '@rline/property';
import { Column } from 'typeorm';

export function StringColumn(
  options: StringPropertyOptions
): PropertyDecorator {
  return (t, p) => {
    Column({ type: 'varchar', nullable: options.required !== true })(t, p);
  };
}
