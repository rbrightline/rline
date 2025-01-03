import { Data } from '@rline/property';
import { FindOneOptions } from '@rline/type';
import { SelectQueryProperty } from '../orm/select-query-property.decorator';
import { WhereQueryProperty } from '../orm/where-query-property.decorator';
import { WithDeleteQueryProperty } from '../orm/with-deleted-query-property.decorator';
import { LoadEagerRelationQueryProperty } from '../orm/load-eager-relations-query-property.decorator';
import { LoadRelationIdsProperty } from '../orm/load-relations-ids.decorators';

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
@Data()
export class FindOneOptionsDto implements FindOneOptions {
  constructor(options?: FindOneOptionsDto) {
    Object.assign(this, options);
  }
  @WhereQueryProperty() where?: Record<string, any>;

  @SelectQueryProperty() select?: string[] = ['id', 'createdAt'];

  @SelectQueryProperty() relations?: string[] = ['category'];

  @WithDeleteQueryProperty() withDeleted?: boolean = false;

  @LoadEagerRelationQueryProperty() loadEagerRelations?: boolean = false;

  @LoadRelationIdsProperty() loadRelationIds?: boolean = false;
}
