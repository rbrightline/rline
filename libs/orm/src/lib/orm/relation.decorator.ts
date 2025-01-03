import { Type } from '@nestjs/common';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

export type RelationOptions = {
  type: 'one' | 'many' | 'owner';
  target: () => Type;
};

export function Relation(options: RelationOptions): PropertyDecorator {
  return (t, p) => {
    const { type } = options;

    if (type === 'one') {
      ManyToOne(options.target, (c) => c.id, {
        cascade: true,
        eager: true,
        nullable: true,
        onDelete: 'SET NULL',
        createForeignKeyConstraints: false,
      })(t, p);
      JoinColumn()(t, p);
    } else if (type === 'many') {
      ManyToMany(options.target, (c) => c.id, {
        cascade: true,
        eager: true,
        nullable: true,
        onDelete: 'SET NULL',
      })(t, p);
      JoinTable()(t, p);
    } else if (type === 'owner') {
      ManyToOne(options.target, (c) => c.id, { onDelete: 'CASCADE' })(t, p);
      JoinColumn()(t, p);
    }
  };
}
