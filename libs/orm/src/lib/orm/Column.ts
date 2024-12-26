import { Property } from '@rline/property';
import { arr, bool, date, num, str } from '@rline/type';
import { Column as __Column, ColumnOptions } from 'typeorm';

export function Column(options: ColumnOptions): PropertyDecorator {
  return (t, p) => {
    const type = options.type;

    const po = {
      required: options.nullable == true ? false : true,
    };

    const co: ColumnOptions = {
      nullable: options.nullable,
      unique: options.unique,
      default: options.default,
    };

    switch (type) {
      case 'string':
        Property({ type: 'string', ...po, default: str(options.default) })(
          t,
          p
        );
        __Column({ ...co, type: 'varchar', default: str(options.default) })(
          t,
          p
        );
        break;

      case 'number':
        Property({ type: 'number', ...po, default: num(options.default) })(
          t,
          p
        );
        __Column({ ...co, type: 'numeric', default: num(options.default) })(
          t,
          p
        );
        break;

      case 'integer':
        Property({ type: 'integer', ...po, default: num(options.default) })(
          t,
          p
        );
        __Column({ ...co, type: 'integer', default: num(options.default) })(
          t,
          p
        );
        break;

      case 'boolean':
        Property({ type: 'boolean', ...po, default: bool(options.default) })(
          t,
          p
        );
        __Column({
          type: 'boolean',
          nullable: true,
          default: bool(options.default),
        })(t, p);
        break;

      case 'jsonb':
        Property({ type: 'string', ...po, default: str(options.default) })(
          t,
          p
        );
        __Column({ type: 'jsonb', nullable: true })(t, p);
        break;

      case 'array':
        Property({
          type: 'array',
          ...po,
          default: arr(options.default),
          items: { type: 'string' },
        })(t, p);
        __Column({ ...co, type: 'simple-array', default: arr(options.default) })(t, p);
        break;

      case 'date':
        Property({ ...po, type: 'string', format: 'datetime' })(t, p);
        __Column({ ...co, type: 'timestamp', default: date(options.default) })(
          t,
          p
        );
        break;

      default:
        throw new Error(
          'Invalid column type varchar | number | array | boolean | integer | jsonb'
        );
    }
  };
}
