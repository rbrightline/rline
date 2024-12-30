import { Property } from '@rline/property';
import { ViewColumn as __ViewColumn } from 'typeorm';

export type ViewColumnOptions = {
  type: 'string' | 'number' | 'integer' | 'boolean';
  format?: string;
};

export function ViewColumn(options: ViewColumnOptions): PropertyDecorator {
  return (t, p) => {
    Property({ type: options.type })(t, p);
    __ViewColumn()(t, p);
  };
}
