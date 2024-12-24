import { ActiveModel, bool } from '@rline/type';
import { QueryProperty } from '@rline/property';
import { TimestampQueryDto } from './TimestampQueryDto';

export class ActiveQueryDto extends TimestampQueryDto implements ActiveModel {
  @QueryProperty() active = bool();
}
