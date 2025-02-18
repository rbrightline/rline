import { Body, Logger, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  CreateSampleDto,
  QuerySampleDto,
  Sample,
  UpdateSampleDto,
} from '@rline/entity';
import {
  DeleteResultDto,
  EntityService,
  InjectEntityService,
  OrderDto,
  PaginatorDto,
  RelationParamDto,
  UpdateResultDto,
} from '@rline/orm';
import {
  AddRelation,
  Controller,
  Delete,
  Read,
  ReadOneById,
  RemoveRelation,
  Save,
  SetRelation,
  UnsetRelation,
  Update,
} from '@rline/rest';

@Controller()
export class SampleController {
  constructor(
    @InjectEntityService(Sample)
    protected readonly service: EntityService<Sample>,
    protected logger: Logger
  ) {}

  @Read('samples', () => Sample)
  read(
    @Query() paginator: PaginatorDto<Sample>,
    @Query() where: QuerySampleDto,
    @Query() order: OrderDto<Sample>
  ) {
    this.logger.debug(paginator);
    this.logger.debug(where);
    this.logger.debug(order);
    return this.service.read(paginator, where, order);
  }

  @ReadOneById('sample/:id', () => Sample)
  readOneById(@Param('id', ParseIntPipe) id: number) {
    this.logger.debug(id);
    return this.service.readOneById(id);
  }

  @Save('sample', () => Sample)
  save(@Body() entity: CreateSampleDto) {
    this.logger.debug(entity);
    return this.service.save(entity);
  }

  @Update('sample/:id', () => UpdateResultDto)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: UpdateSampleDto
  ) {
    this.logger.debug(id);
    this.logger.debug(entity);
    return this.service.update(id, entity);
  }

  @Delete('sample/:id', () => DeleteResultDto)
  delete(@Param('id', ParseIntPipe) id: number) {
    this.logger.debug(id);
    return this.service.delete(id);
  }

  @AddRelation('sample/:id/:rn/:rid', () => UpdateResultDto)
  async addRelation(@Param() param: RelationParamDto) {
    return await this.service.addRelation(param);
  }

  @RemoveRelation('sample/:id/:rn/:rid', () => UpdateResultDto)
  async removeRelation(@Param() param: RelationParamDto) {
    return await this.service.removeRelation(param);
  }

  @SetRelation('sample/:id/:rn/:rid', () => UpdateResultDto)
  async setRelation(@Param() param: RelationParamDto) {
    return await this.service.setRelation(param);
  }

  @UnsetRelation('sample/:id/:rn', () => UpdateResultDto)
  async unsetRelation(@Param() param: RelationParamDto) {
    return await this.service.unsetRelation(param);
  }
}
