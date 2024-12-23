import { Exclude } from 'class-transformer';
import { Entity, Unique } from 'typeorm';

export function E(uniques?: string[]): ClassDecorator {
  return (t) => {
    Exclude()(t);
    Entity()(t);
    if (uniques && uniques.length > 0) Unique(uniques)(t);
  };
}
