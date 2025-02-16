import { BooleanPropertyOptions } from '@rline/property';
import { Column } from 'typeorm';

export function BooleanColumn(
  options: BooleanPropertyOptions
): PropertyDecorator {
  return (t, p) => {
    return Column({ type: 'boolean', nullable: options.required !== true })(
      t,
      p
    );
  };
}
