import { QueryProperty } from '@rline/property';
import { IDModel, ModelQuery, nvalue } from '@rline/type';
import { FindOperator } from 'typeorm';

export class IDQueryDto implements ModelQuery<IDModel, FindOperator<any>> {
  @QueryProperty() id = nvalue<FindOperator<number>>();
}
