import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Type,
  UseFilters,
} from '@nestjs/common';
import {
  AddRelationOptionsDto,
  CountByRelationOptionsDto,
  CountResultDto,
  EntityRelationService,
  FindByRelationOptionsDto,
  FindManyOptionsDto,
  InjectRelationService,
  RemoveRelationOptionsDto,
  SetRelationOptionsDto,
  UnsetRelationOptionsDto,
  UpdateResultDto,
} from '@rline/orm';
import { ObjectLiteral } from 'typeorm';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { restPaths } from '@rline/utils';
import { RestExceptionFilter } from './rest-exception.filter';

export interface RelationControllerInterface<Entity extends ObjectLiteral> {
  findByRelation(
    params: FindByRelationOptionsDto,
    query: FindManyOptionsDto<Entity>
  ): Promise<Entity[]>;

  addRelation(params: AddRelationOptionsDto): Promise<UpdateResultDto>;
  removeRelation(params: RemoveRelationOptionsDto): Promise<UpdateResultDto>;

  setRelation(params: SetRelationOptionsDto): Promise<UpdateResultDto>;
  unsetRelation(params: UnsetRelationOptionsDto): Promise<UpdateResultDto>;

  countByRelation(params: CountByRelationOptionsDto): Promise<CountResultDto>;
}

export function RelationControllerFactory<T extends ObjectLiteral>(
  entity: Type<T>
): Type<RelationControllerInterface<T>> {
  const R = restPaths(entity.name)!;

  @UseFilters(RestExceptionFilter)
  @ApiTags(entity.name + ' Relations')
  @ApiBearerAuth()
  @Controller()
  class RelationController<T extends ObjectLiteral>
    implements RelationControllerInterface<T>
  {
    constructor(
      @InjectRelationService(entity)
      protected readonly service: EntityRelationService<T>
    ) {}

    @ApiOperation({ summary: 'Find by relation id' })
    @ApiOkResponse({ type: [entity], example: [new entity(), new entity()] })
    @Get(R.relation)
    findByRelation(
      @Param() params: FindByRelationOptionsDto,
      @Query() query: FindManyOptionsDto<T>
    ): Promise<T[]> {
      return this.service.findByRelation(params, query);
    }

    @ApiOperation({ summary: 'Add relation (x-to-many)' })
    @ApiOkResponse({ type: UpdateResultDto, example: new UpdateResultDto() })
    @Put(R.relationId)
    addRelation(@Param() params: AddRelationOptionsDto) {
      return this.service.addRelation(params);
    }

    @ApiOperation({ summary: 'Remove relation (x-to-many)' })
    @ApiOkResponse({ type: UpdateResultDto, example: new UpdateResultDto() })
    @Delete(R.relationId)
    removeRelation(@Param() params: RemoveRelationOptionsDto) {
      return this.service.removeRelation(params);
    }

    @ApiOperation({ summary: 'Set relation (x-to-one)' })
    @ApiOkResponse({ type: UpdateResultDto, example: new UpdateResultDto() })
    @Post(R.relationId)
    setRelation(@Param() params: SetRelationOptionsDto) {
      return this.service.setRelation(params);
    }

    @ApiOperation({ summary: 'Unset relation (x-to-one)' })
    @ApiOkResponse({ type: UpdateResultDto, example: new UpdateResultDto() })
    @Delete(R.relation)
    unsetRelation(@Param() params: UnsetRelationOptionsDto) {
      return this.service.unsetRelation(params);
    }

    @ApiOperation({ summary: 'Count by relation id' })
    @ApiOkResponse({ type: CountResultDto, example: new CountResultDto() })
    @Get(R.relationId)
    countByRelation(
      @Param() params: CountByRelationOptionsDto
    ): Promise<CountResultDto> {
      return this.service.countByRelation(params);
    }
  }

  return RelationController;
}
