import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateCategoryDto } from './create-category.dto';

@Exclude()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
