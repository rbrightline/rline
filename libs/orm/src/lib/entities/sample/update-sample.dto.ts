import { PartialType } from '@nestjs/swagger';
import { Data } from '@rline/property';
import { CreateSampleDto } from './create-sample.dto';

@Data()
export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
