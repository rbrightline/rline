import { Exclude } from 'class-transformer';
import { ViewEntity as __ViewEntity } from 'typeorm';
import { ViewEntityOptions } from 'typeorm/decorator/options/ViewEntityOptions.js';

export function ViewEntity(options: ViewEntityOptions): ClassDecorator {
  return (t) => {
    __ViewEntity(options)(t);
    Exclude()(t);
  };
}
