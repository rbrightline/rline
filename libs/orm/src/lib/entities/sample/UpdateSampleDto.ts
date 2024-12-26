import { PartialType } from '@nestjs/swagger';
import { Data } from '@rline/property';
import { CreateSampleDto } from './CreateSampleDto';

@Data()
export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
