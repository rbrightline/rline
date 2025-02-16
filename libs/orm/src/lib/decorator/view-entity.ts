import { Exclude } from 'class-transformer';
import { ViewEntity as __ViewEntity, ViewOptions } from 'typeorm';

export function ViewEntity(options: ViewOptions): ClassDecorator {
  return (t) => {
    __ViewEntity(options)(t);
    Exclude()(t);
  };
}
