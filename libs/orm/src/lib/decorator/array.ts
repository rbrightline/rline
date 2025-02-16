import { ArrayPropertyOptions } from '@rline/property';
import { Column } from 'typeorm';

export function ArrayColumn<T>(
  options: ArrayPropertyOptions<T>
): PropertyDecorator {
  return (t, p) => {
    Column({
      type: 'varchar',
      nullable: options.required !== true,
      transformer: {
        to(value) {
          if (value != undefined) {
            return JSON.stringify(value);
          }
          return value;
        },
        from(value) {
          if (value != undefined) {
            return JSON.parse(value);
          }
          return value;
        },
      },
    })(t, p);
  };
}
