import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateSampleDto } from './create-sample.dto';

@Exclude()
export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
