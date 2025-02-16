import { Exclude } from 'class-transformer';
import { Entity as __Entity, Unique } from 'typeorm';

export function Entity(uniques?: string[]): ClassDecorator {
  return (t) => {
    __Entity()(t);
    if (uniques && uniques.length > 0) {
      Unique(uniques)(t);
      Exclude()(t);
    }
  };
}
