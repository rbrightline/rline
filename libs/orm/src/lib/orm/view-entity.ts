import { Exclude } from 'class-transformer';
import { ViewEntity } from 'typeorm';
import { ViewEntityOptions } from 'typeorm/decorator/options/ViewEntityOptions.js';

export function ViewEntityf(options: ViewEntityOptions): ClassDecorator {
  return (t) => {
    Exclude()(t);
    ViewEntity(options)(t);
  };
}
