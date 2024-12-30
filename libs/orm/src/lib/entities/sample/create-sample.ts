import { Data, Property } from '@rline/property';
import { CreateSampleModel, SampleModelObject } from '@rline/type';
import { CreateSampleObjectDto } from './create-sample-object';
import { IDDto } from '../../dto/id';

@Data()
export class CreateSampleDto implements CreateSampleModel {
  @Property({ type: 'string' }) sampleString?: string;

  @Property({ type: 'number' }) sampleNumber?: number;

  @Property({ type: 'integer' }) sampleInteger?: number;

  @Property({ type: 'string', format: 'datetime' }) sampleDate?: Date;

  @Property({ type: 'boolean' }) sampleBoolean?: boolean;

  @Property({ type: 'object' }, () => CreateSampleObjectDto)
  sampleObject?: SampleModelObject;

  @Property({ type: 'array', items: { type: 'string' } })
  sampleArray?: string[];

  @Property({ type: 'object' }, () => IDDto) category?: IDDto;

  @Property({ type: 'array', items: { type: 'object' } }, () => IDDto)
  categories?: IDDto[];
}
