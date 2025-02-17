import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  EntityService,
  InjectEntityService,
  OrderDto,
  PaginatorDto,
  RelationParamDto,
  UnsetRelationParamDto,
} from '../../src';
import { CreateSampleDto } from './dto/create-sample.dto';
import { QuerySampleDto } from './dto/query-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { Sample } from './sample.entity';

@Controller('api')
export class SampleController {
  constructor(
    @InjectEntityService(Sample)
    protected readonly service: EntityService<Sample>
  ) {}

  @Post('sample')
  save(@Body() entity: CreateSampleDto) {
    return this.service.save(entity);
  }

  @Get('samples')
  read(
    @Query() paginator: PaginatorDto<Sample>,
    @Query() where: QuerySampleDto,
    @Query() order: OrderDto<Sample>
  ) {
    return this.service.read(paginator, where, order);
  }

  @Get('sample/:id')
  readOneById(@Param('id', ParseIntPipe) id: number) {
    return this.service.readOneById(id);
  }

  @Put('sample/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: UpdateSampleDto
  ) {
    return this.service.update(id, entity);
  }

  @Delete('sample/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Put('sample/:id/:rn/:rid')
  addRelation(@Param() relation: RelationParamDto) {
    return this.service.addRelation(relation);
  }

  @Delete('sample/:id/:rn/:rid')
  removeRelation(@Param() relation: RelationParamDto) {
    return this.service.removeRelation(relation);
  }

  @Post('sample/:id/:rn/:rid')
  setRelation(@Param() relation: RelationParamDto) {
    return this.service.setRelation(relation);
  }

  @Delete('sample/:id/:rn')
  unsetRelation(@Param() relation: UnsetRelationParamDto) {
    return this.service.unsetRelation(relation);
  }
}
