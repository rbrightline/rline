import { Property } from '@rline/property';
import { BaseModel } from '@rline/type';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity implements BaseModel {
  @Property({ type: 'integer' })
  @PrimaryGeneratedColumn()
  id: number;

  @Property({ type: 'date' })
  @CreateDateColumn()
  createdAt: Date;

  @Property({ type: 'date' })
  @UpdateDateColumn()
  updatedAt: Date;

  @Property({ type: 'date' })
  @DeleteDateColumn()
  deletedAt: Date;
}
