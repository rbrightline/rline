import { Property } from '@rline/property';

import {
  Column as __Column,
  ColumnOptions as TypeOrmColumnOptions,
} from 'typeorm';

export type ColumnOptions = Omit<TypeOrmColumnOptions, 'nullable'> & {
  required?: boolean;
};

export function Column(options: ColumnOptions): PropertyDecorator {
  return (t, p) => {
    const type = options.type;

    const po = {
      required: options.required == true,
    };

    const co: TypeOrmColumnOptions = {
      nullable: options.required == true ? false : true,
      unique: options.unique,
      default: options.default,
    };

    switch (type) {
      case 'string':
        Property({ type: 'string', ...po, example: 'sample string' })(t, p);
        __Column({ ...co, type: 'varchar' })(t, p);
        break;

      case 'number':
        Property({ type: 'number', ...po, example: 10.09 })(t, p);
        __Column({ ...co, type: 'numeric' })(t, p);
        break;

      case 'integer':
        Property({ type: 'integer', ...po, example: 100 })(t, p);
        __Column({ ...co, type: 'integer' })(t, p);
        break;

      case 'boolean':
        Property({ type: 'boolean', ...po, example: true })(t, p);
        __Column({ type: 'boolean', nullable: true })(t, p);
        break;

      case 'jsonb':
        Property({ type: 'string', ...po, example: {} })(t, p);
        __Column({ type: 'jsonb', nullable: true })(t, p);
        break;

      case 'array':
        Property({
          type: 'array',
          ...po,
          items: { type: 'string' },
          example: ['first', 'second', 'third'],
        })(t, p);
        __Column({ ...co, type: 'simple-array' })(t, p);
        break;

      case 'date':
        Property({
          ...po,
          type: 'string',
          format: 'datetime',
          example: new Date().toISOString(),
        })(t, p);
        __Column({ ...co, type: 'timestamp' })(t, p);
        break;

      default:
        throw new Error(
          'Invalid column type varchar | number | array | boolean | integer | jsonb'
        );
    }
  };
}
