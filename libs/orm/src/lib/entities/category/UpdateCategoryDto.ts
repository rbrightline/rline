import { PartialType } from '@nestjs/swagger';
import { Data } from '@rline/property';
import { CreateCategoryDto } from './CreateCategoryDto';

@Data()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
