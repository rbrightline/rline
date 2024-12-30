import { PartialType } from '@nestjs/swagger';
import { Data, Property } from '@rline/property';
import { SampleModelObject } from '@rline/type';

@Data()
export class CreateSampleObjectDto implements SampleModelObject {
  @Property({ type: 'string' }) property!: string;
  @Property({ type: 'string' }) value!: string;
}

@Data()
export class UpdateSampleObjectDto extends PartialType(CreateSampleObjectDto) {}
