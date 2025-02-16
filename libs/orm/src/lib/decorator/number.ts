import { NumberPropertyOptions } from '@rline/property';
import { Column } from 'typeorm';

export function NumberColumn(
  options: NumberPropertyOptions
): PropertyDecorator {
  return (t, p) => {
    Column({ type: 'numeric', nullable: options.required !== true })(t, p);
  };
}
