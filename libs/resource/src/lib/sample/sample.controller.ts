import { Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CreateSampleDto, Sample, UdpateSampleDto } from '@rline/entity';
import {
  BaseQueryDto,
  EntityService,
  InjectEntityService,
  OrderDto,
  PaginatorDto,
  UpdateResultDto,
} from '@rline/orm';
import { Controller, Read, ReadOneById, Save, Update } from '@rline/rest';

@Controller()
export class SampleController {
  constructor(
    @InjectEntityService(Sample)
    protected readonly service: EntityService<Sample>
  ) {}

  @Read('samples', () => Sample)
  read(
    @Query() paginator: PaginatorDto<Sample>,
    @Query() where: BaseQueryDto,
    @Query() order: OrderDto<Sample>
  ) {
    return this.service.read(paginator, where, order);
  }

  @ReadOneById('sample/:id', () => Sample)
  readOneById(@Param('id', ParseIntPipe) id: number) {
    return this.service.readOneById(id);
  }

  @Save('sample', () => Sample)
  save(@Body() entity: CreateSampleDto) {
    return this.service.save(entity);
  }

  @Update('sample/:id', () => UpdateResultDto)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: UdpateSampleDto
  ) {
    return this.service.update(id, entity);
  }

  @Update('sample/:id', () => UpdateResultDto)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
