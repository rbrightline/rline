/**
 * Data Transfer Object (DTO) for FindOneOptions.
 *
 * This class implements the FindOneOptions interface and is used to define the options
 * for finding a single entity in the database.
 *
 * @property {boolean} [loadEagerRelations=false] - Whether to load eager relations.
 * @property {boolean} [loadRelationIds=false] - Whether to load relation IDs.
 * @property {string[]} [relations] - Array of relation names to load.
 * @property {string[]} [select] - Array of property names to select.
 * @property {Record<string, any>} [where=false] - Conditions to filter the entities.
 * @property {boolean} [withDeleted=false] - Whether to include soft-deleted entities.
 */
import { Data, Property } from '@rline/property';
import { FindOneOptions } from '@rline/type';

@Data()
export class FindOneOptionsDto implements FindOneOptions {
  constructor(options?: FindOneOptionsDto) {
    Object.assign(this, options);
  }
  @Property({ type: 'boolean', default: false }) loadEagerRelations?: boolean;

  @Property({ type: 'boolean', default: false }) loadRelationIds?: boolean;

  @Property({ type: 'array', items: { type: 'string' } }) relations?: string[];

  @Property({ type: 'array', items: { type: 'string' } }) select?: string[];

  @Property({ type: 'boolean', default: false }) where?: Record<string, any>;

  @Property({ type: 'boolean', default: false }) withDeleted?: boolean;
}
