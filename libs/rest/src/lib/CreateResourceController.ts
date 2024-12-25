import { Body, Param, ParseIntPipe, Query, Type } from '@nestjs/common';
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
import { ResourceControllerOptions } from './ResourceControllerOptions';

export function CreateResourceController(
  options: ResourceControllerOptions
): Type[] {
  const {
    entity,
    createDto,
    updateDto,
    queryDto,
    addRelation,
    setRelation,
    increment,
    read,
    write,
  } = options;

  const constrollers: Type[] = [];

  const Rest = new ResourceControllerBuilder(
    entity,
    createDto,
    updateDto,
    queryDto
  );

  @Rest.Controller()
  class __BaseController {
    constructor(
      @InjectEntityService(entity)
      protected readonly service: EntityService<any>
    ) {}
  }

  @Rest.Controller()
  class __Read extends __BaseController {
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
    @Rest.Count()
    Count(@Query() query: QueryDto) {
      return this.service.count(query as any);
    }
  }

  @Rest.Controller()
  class __Write extends __BaseController {
    @Rest.Save()
    Save(@Body() entity: any) {
      return this.service.save(entity);
    }

    @Rest.Update()
    Update(@Param('id', ParseIntPipe) id: number, @Body() entity: any) {
      return this.service.update(id, entity);
    }

    @Rest.Delete()
    async Delete(@Param('id', ParseIntPipe) id: number) {
      return await this.service.delete(id);
    }
  }

  @Rest.Controller()
  class __AddRelation extends __BaseController {
    @Rest.AddRelation()
    AddRelation(@Param() relation: AddRelationDto) {
      return this.service.addRelation(relation);
    }

    @Rest.RemoveRelation()
    RemoveRelation(@Param() relation: RemoveRelationDto) {
      return this.service.removeRelation(relation);
    }
  }

  @Rest.Controller()
  class __SetRelation extends __BaseController {
    @Rest.SetRelation()
    SetRelation(@Param() relation: SetRelationDto) {
      return this.service.setRelation(relation);
    }

    @Rest.UnsetRelation()
    UnsetRelation(@Param() relation: UnsetRelationDto) {
      return this.service.unsetRelation(relation);
    }
  }
  @Rest.Controller()
  class __Increment extends __BaseController {
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

  if (increment) constrollers.push(__Increment);
  if (addRelation) constrollers.push(__AddRelation);
  if (setRelation) constrollers.push(__SetRelation);
  if (read) constrollers.push(__Read);
  if (write) constrollers.push(__Write);

  return constrollers;
}
