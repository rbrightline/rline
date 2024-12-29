import { Data, QueryProperty } from '@rline/property';
import { Nonable, nvalue, SampleModel } from '@rline/type';
import { FindOperator } from 'typeorm';
import { TimestampQueryDto } from '../../base/TimestampQueryDto';

@Data()
export class WhereSampleOptionsDto
  extends TimestampQueryDto
  implements Record<keyof SampleModel, Nonable<FindOperator<any>>>
{
  @QueryProperty() sampleString = nvalue<FindOperator<string>>();
  @QueryProperty() sampleNumber = nvalue<FindOperator<number>>();
  @QueryProperty() sampleInteger = nvalue<FindOperator<number>>();
  @QueryProperty() sampleDate = nvalue<FindOperator<Date>>();
  @QueryProperty() sampleBoolean = nvalue<FindOperator<boolean>>();
  @QueryProperty() sampleObject = nvalue<FindOperator<any>>();
  @QueryProperty() sampleArray = nvalue<FindOperator<any>>();
  @QueryProperty() category = nvalue<FindOperator<any>>();
  @QueryProperty() categories = nvalue<FindOperator<any>>();
}
