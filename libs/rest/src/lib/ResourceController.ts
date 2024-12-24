import { Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  AddRelationDto,
  EntityService,
  IncrementDto,
  InjectEntityService,
  QueryDto,
  QueryOneDto,
  RemoveRelationDto,
  SetRelationDto,
  UnsetRelationDto,
} from '@rline/orm';
import { ResourceControllerBuilder } from './ResourceControllerBuilder';
import { FindManyOptions } from 'typeorm';

export function ResourceController(
  entity: any,
  createDto: any = entity,
  updateDto: any = entity,
  queryDto: any = entity
) {
  const Rest = new ResourceControllerBuilder(
    entity,
    createDto,
    updateDto,
    queryDto
  );

  @Rest.Controller()
  class __ResourceController {
    constructor(
      @InjectEntityService(entity) public readonly service: EntityService<any>
    ) {}

    @Rest.Save()
    Save(@Body() entity: any) {
      return this.service.save(entity);
    }

    @Rest.Find()
    Find(@Query() query: QueryDto) {
      console.table(query);
      return this.service.find(query as FindManyOptions<any>, {});
    }

    @Rest.FindOneById()
    async FindOneById(
      @Param('id', ParseIntPipe) id: number,
      @Query() query: QueryOneDto
    ) {
      return await this.service.findOneById(id, query as any);
    }

    @Rest.Update()
    Update(@Param('id', ParseIntPipe) id: number, @Body() entity: any) {
      return this.service.update(id, entity);
    }

    @Rest.Delete()
    Delete(@Param('id', ParseIntPipe) id: number) {
      return this.service.delete(id);
    }

    @Rest.AddRelation()
    AddRelation(@Param() relation: AddRelationDto) {
      return this.service.addRelation(relation);
    }

    @Rest.RemoveRelation()
    RemoveRelation(@Param() relation: RemoveRelationDto) {
      return this.service.removeRelation(relation);
    }

    @Rest.SetRelation()
    SetRelation(@Param() relation: SetRelationDto) {
      return this.service.setRelation(relation);
    }

    @Rest.UnsetRelation()
    UnsetRelation(@Param() relation: UnsetRelationDto) {
      return this.service.unsetRelation(relation);
    }

    @Rest.Count()
    Count(@Query() query: QueryDto) {
      return this.service.count(query as any);
    }

    @Rest.Increment()
    Increment(
      @Param('id', ParseIntPipe) id: number,
      @Body() increment: IncrementDto
    ) {
      return this.service.increment(id, increment);
    }

    @Rest.Decrement()
    Decrement(
      @Param('id', ParseIntPipe) id: number,
      @Body() increment: IncrementDto
    ) {
      return this.service.decrement(id, increment);
    }
  }

  return __ResourceController;
}
