/**
 * Represents an entity with an auto-generated primary key.
 *
 * @implements {IDModel}
 *
 * @property {number} id - The primary key of the entity, which is auto-generated.
 *
 * @decorator `@Property` - Specifies that the `id` property is of type 'integer' and is not required.
 * @decorator `@PrimaryGeneratedColumn` - Indicates that the `id` property is a primary key and its value is auto-generated.
 */
import { Property } from '@rline/property';
import { IDModel } from '@rline/type';
import { PrimaryGeneratedColumn } from 'typeorm';

export class IDEntity implements IDModel {
  @Property({ type: 'integer', required: false })
  @PrimaryGeneratedColumn()
  id?: number;
}
