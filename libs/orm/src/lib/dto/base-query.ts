import { Exclude } from 'class-transformer';
import { BaseEntity } from '../entity';
import { QueryProperty } from '../query';

@Exclude()
export class BaseQueryDto implements BaseEntity {
  @QueryProperty({ type: 'integer' }) id: number;
  @QueryProperty({ type: 'date' }) createdAt: Date;
  @QueryProperty({ type: 'date' }) updatedAt: Date;
  @QueryProperty({ type: 'date' }) deletedAt: Date;
}
