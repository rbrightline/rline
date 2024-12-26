import { PartialType } from '@nestjs/swagger';
import { Data, Property } from '@rline/property';
import { SampleModelObject, str } from '@rline/type';

@Data()
export class CreateSampleObjectDto implements SampleModelObject {
  @Property({ type: 'string' }) property = str();
  @Property({ type: 'string' }) value = str();
}

@Data()
export class UpdateSampleObjectDto extends PartialType(CreateSampleObjectDto) {}
