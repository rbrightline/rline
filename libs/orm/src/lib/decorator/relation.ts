import { Type } from '@nestjs/common';
import {
  RelationOptions as __RelationOptions,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { RelationType } from 'typeorm/metadata/types/RelationTypes.js';

export type ExtraRelationOptions = Readonly<{
  type: RelationType;
  target: () => Type;
  join?: boolean;
}>;

export type RelationOptions = Readonly<
  __RelationOptions & ExtraRelationOptions
>;
export function Relation<T extends { id: number }>(
  options: RelationOptions
): PropertyDecorator {
  return (t, p) => {
    const { type, target, join, ...rest } = options;

    switch (type) {
      case 'many-to-many':
      case 'one-to-many': {
        if (join === true) {
          JoinTable()(t, p);
        }
        break;
      }
      case 'many-to-one':
      case 'one-to-one': {
        if (join === true) {
          JoinColumn()(t, p);
        }
        break;
      }
    }

    switch (type) {
      case 'many-to-many':
        ManyToMany<T>(
          () => target,
          (e) => e.id,
          rest
        )(t, p);
        break;
      case 'many-to-one':
        ManyToOne<T>(
          () => target,
          (e) => e.id,
          rest
        )(t, p);
        break;
      case 'one-to-many':
        OneToMany<T>(
          () => target,
          (e) => e.id,
          rest
        )(t, p);
        break;
      case 'one-to-one':
        OneToOne<T>(
          () => target,
          (e) => e.id,
          rest
        )(t, p);
        break;
    }
  };
}
