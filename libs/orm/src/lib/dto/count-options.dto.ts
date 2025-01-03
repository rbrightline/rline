import { Data } from '@rline/property';
import { CountOptions, WhereOptions } from '@rline/type';
import { FindOperator } from 'typeorm';
import { WhereQueryProperty } from '../orm/where-query-property.decorator';
import { WithDeleteQueryProperty } from '../orm/with-deleted-query-property.decorator';

/**
 * Data Transfer Object (DTO) for count options.
 *
 * This class is used to define the options for counting entities in the database.
 * It implements the `CountOptions` interface with the specified `Entity` type and `FindOperator`.
 *
 * @template Entity - The type of the entity for which the count options are defined.
 *
 * @implements {CountOptions<Entity, FindOperator<any>>}
 */
@Data()
export class CountOptionsDto<Entity>
  implements CountOptions<Entity, FindOperator<any>>
{
  constructor(options?: CountOptionsDto<Entity>) {
    Object.assign(this, options);
  }

  @WhereQueryProperty() where?: WhereOptions<Entity, FindOperator<any>>;

  @WithDeleteQueryProperty() withDeleted?: boolean = true;
}
