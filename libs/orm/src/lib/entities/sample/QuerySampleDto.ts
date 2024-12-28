import { Data, QueryProperty } from '@rline/property';
import { Nullable, SampleModel, value } from '@rline/type';
import { FindOperator } from 'typeorm';
import { TimestampQueryDto } from '../../base/TimestampQueryDto';
import { CreateQueryDto } from '../../dto/QueryDto';
import { Sample } from './Sample';

@Data()
export class WhereSampleDto
  extends TimestampQueryDto
  implements Record<keyof SampleModel, Nullable<FindOperator<any>>>
{
  @QueryProperty() sampleString = value<FindOperator<string>>();
  @QueryProperty() sampleNumber = value<FindOperator<number>>();
  @QueryProperty() sampleInteger = value<FindOperator<number>>();
  @QueryProperty() sampleDate = value<FindOperator<Date>>();
  @QueryProperty() sampleBoolean = value<FindOperator<boolean>>();
  @QueryProperty() sampleObject = value<FindOperator<any>>();
  @QueryProperty() sampleArray = value<FindOperator<any>>();

  @QueryProperty() category = value<FindOperator<any>>();

  @QueryProperty() categories = value<FindOperator<any>>();
}

@Data()
export class AggreageSampleDto extends CreateQueryDto(() => Sample) {}
