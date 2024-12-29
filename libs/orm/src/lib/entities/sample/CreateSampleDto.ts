import { Data, Property } from '@rline/property';
import {
  arr,
  bool,
  CreateSampleModel,
  date,
  num,
  obj,
  SampleModelObject,
  str,
} from '@rline/type';
import { CreateSampleObjectDto } from './CreateSampleModelObjectDto';
import { IDDto } from '../../query/IDDto';

@Data()
export class CreateSampleDto implements CreateSampleModel {
  @Property({ type: 'string' }) sampleString = str();
  @Property({ type: 'number' }) sampleNumber = num();
  @Property({ type: 'integer' }) sampleInteger = num();
  @Property({ type: 'string', format: 'datetime' }) sampleDate = date();
  @Property({ type: 'boolean' }) sampleBoolean = bool();
  @Property({ type: 'object' }, () => CreateSampleObjectDto) sampleObject =
    obj<SampleModelObject>();
  @Property({ type: 'array', items: { type: 'string' } }) sampleArray =
    arr<string>();

  @Property({ type: 'integer', minimum: 1 }) category = num();

  @Property({ type: 'array', items: { type: 'object' } }, () => IDDto)
  categories = arr<IDDto>();
}
