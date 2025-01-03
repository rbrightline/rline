import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Type,
  UseFilters,
} from '@nestjs/common';
import {
  CountOptionsDto,
  CountResultDto,
  EntityQueryService,
  FindManyOptionsDto,
  FindOneByIdOptionsdDto,
  FindOneOptionsDto,
  InjectQueryService,
} from '@rline/orm';
import { ObjectLiteral } from 'typeorm';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { restPaths } from '@rline/utils';
import { RestExceptionFilter } from './rest-exception.filter';

export interface QueryControllerInterface<T extends ObjectLiteral> {
  findAll(query: FindManyOptionsDto<T>): Promise<T[]>;
  findOneById(id: number, query: FindOneOptionsDto): Promise<T>;
  count(query: CountOptionsDto<T>): Promise<CountResultDto>;
}

export function QueryControllerFactory<T extends ObjectLiteral>(
  entity: Type<T>
): Type<QueryControllerInterface<T>> {
  const R = restPaths(entity.name)!;

  @UseFilters(RestExceptionFilter)
  @ApiTags(entity.name + ' Query')
  @ApiBearerAuth()
  @Controller()
  class QueryController<T extends ObjectLiteral>
    implements QueryControllerInterface<T>
  {
    constructor(
      @InjectQueryService(entity)
      protected readonly service: EntityQueryService<T>
    ) {}

    @ApiOperation({ summary: 'Find all' })
    @ApiOkResponse({ type: [entity], example: [new entity(), new entity()] })
    @Get(R.plural)
    findAll(@Query() query: FindManyOptionsDto<T>): Promise<T[]> {
      return this.service.findAll(query);
    }

    @ApiOperation({ summary: 'Find one by id' })
    @ApiOkResponse({ type: entity, example: new entity() })
    @ApiNotFoundResponse({ description: `Entity with the id not found` })
    @Get(R.id)
    async findOneById(
      @Param('id', ParseIntPipe) id: number,
      @Query() query: FindOneByIdOptionsdDto
    ): Promise<T> {
      const found = await this.service.findOne({ ...query, where: { id } });
      if (!found) {
        throw new NotFoundException(`Entity with the id ${id} not found`);
      }
      return found;
    }

    @ApiOperation({ summary: 'Count' })
    @ApiOkResponse({ type: CountResultDto, example: { count: 0 } })
    @Get(R.count)
    count(@Query() query: CountOptionsDto<T>) {
      return this.service.count(query);
    }
  }

  return QueryController;
}
