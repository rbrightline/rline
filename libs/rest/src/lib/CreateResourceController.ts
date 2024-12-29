import {
  Body,
  Optional,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  Type,
} from '@nestjs/common';
import {
  AddRelationDto,
  EntityService,
  FindByRelationDto,
  FindByRelationIdDto,
  IncrementDto,
  InjectEntityService,
  RemoveRelationDto,
  SetRelationDto,
  UnsetRelationDto,
} from '@rline/orm';
import { ResourceControllerBuilder } from './ResourceControllerBuilder';
import { ResourceControllerOptions } from './ResourceControllerOptions';
import { ValidationPipeWithType } from './GlobalValidationPipe';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

export function CreateResourceController(
  options: ResourceControllerOptions
): Type[] {
  const {
    entity,
    createDto,
    updateDto,
    whereOptionsDto,
    findOptionsDto,
    read,
    write,
    addRelation,
    setRelation,
    increment,
    queryRelation,
  } = options;

  const constrollers: Type[] = [];

  const Rest = new ResourceControllerBuilder({
    entity,
    createDto,
    updateDto,
    whereOptionsDto,
  });

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
    Find(
      @Query(ValidationPipeWithType(() => findOptionsDto))
      query: FindManyOptions<any>,
      @Query(ValidationPipeWithType(() => whereOptionsDto))
      where: FindOptionsWhere<any>
    ) {
      return this.service.find({ ...query, where } as any);
    }

    @Rest.FindOneById()
    async FindOneById(
      @Param('id', ParseIntPipe) id: number,
      @Query(ValidationPipeWithType(() => findOptionsDto))
      query: FindOneOptions<any>
    ) {
      console.log('id', id);
      console.log('Query : ', query);
      return await this.service.findOneById(id, query);
    }

    @Rest.Count()
    Count(
      @Query(ValidationPipeWithType(() => whereDto)) where: any,
      @Query(ValidationPipeWithType(() => CountQueryDto)) query: CountQueryDto
    ) {
      return this.service.count({ where });
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
    async Delete(
      @Param('id', ParseIntPipe) id: number,
      @Optional() @Query(ParseBoolPipe) hardDelete = false
    ) {
      if (hardDelete) {
        return await this.service.delete(id);
      } else {
        return await this.service.softDelete(id);
      }
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

  @Rest.Controller()
  class __QueryRelation extends __BaseController {
    @Rest.FindByRelation()
    findByRelation(@Query() query: FindByRelationDto) {
      return this.service.findByRelation(query);
    }

    @Rest.FindByRelationId()
    findByRelationId(@Query() query: FindByRelationIdDto) {
      return this.service.findByRelationId(query);
    }
  }

  if (increment) constrollers.push(__Increment);
  if (addRelation) constrollers.push(__AddRelation);
  if (setRelation) constrollers.push(__SetRelation);
  if (read) constrollers.push(__Read);
  if (write) constrollers.push(__Write);

  if (queryRelation) constrollers.push(__QueryRelation);

  return constrollers;
}
