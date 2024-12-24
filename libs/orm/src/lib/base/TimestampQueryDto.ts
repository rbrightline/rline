import { date } from '@rline/type';
import { IDQueryDto } from './IDQueryDto';
import { QueryProperty } from '@rline/property';

export class TimestampQueryDto extends IDQueryDto {
  @QueryProperty() createdAt = date();
  @QueryProperty() updatedAt = date();
  @QueryProperty() deletedAt = date();
}
