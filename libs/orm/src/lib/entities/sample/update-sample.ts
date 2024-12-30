import { PartialType } from '@nestjs/swagger';
import { Data } from '@rline/property';
import { CreateSampleDto } from './create-sample';

@Data()
export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
