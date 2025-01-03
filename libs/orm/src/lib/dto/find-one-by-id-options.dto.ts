import { Data } from '@rline/property';
import { SelectQueryProperty } from '../orm/select-query-property.decorator';
import { FindOneByIdOptions } from '@rline/type';
import { WithDeleteQueryProperty } from '../orm/with-deleted-query-property.decorator';
import { LoadEagerRelationQueryProperty } from '../orm/load-eager-relations-query-property.decorator';
import { LoadRelationIdsProperty } from '../orm/load-relations-ids.decorators';

@Data()
export class FindOneByIdOptionsdDto implements FindOneByIdOptions {
  constructor(options?: FindOneByIdOptionsdDto) {
    Object.assign(this, options);
  }

  @SelectQueryProperty() select?: string[] = ['id', 'createdAt'];

  @SelectQueryProperty() relations?: string[] = ['category'];

  @WithDeleteQueryProperty() withDeleted?: boolean = false;

  @LoadEagerRelationQueryProperty() loadEagerRelations?: boolean = false;

  @LoadRelationIdsProperty() loadRelationIds?: boolean = false;
}
