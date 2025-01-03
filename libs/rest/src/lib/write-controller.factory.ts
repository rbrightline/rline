import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Type,
  UseFilters,
} from '@nestjs/common';
import {
  DeleteResultDto,
  EntityWriteService,
  InjectWriteService,
  UpdateResultDto,
} from '@rline/orm';
import { DeepPartial, ObjectLiteral } from 'typeorm';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { restPaths } from '@rline/utils';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';
import { RestExceptionFilter } from './rest-exception.filter';
import { ResourceName } from './decorator/resource-name.metadata';
import { ResourceOperationName } from './decorator/resource-operation-name.metadata';
import { OperationName } from '@rline/type';

export interface WriteControllerInterface<Entity extends ObjectLiteral> {
  save(body: DeepPartial<Entity>): Promise<Entity>;
  update(
    id: number,
    body: QueryDeepPartialEntity<Entity>
  ): Promise<UpdateResultDto>;
  delete(id: number): Promise<UpdateResultDto>;
  restore(id: number): Promise<UpdateResultDto>;
}

export function WriteControllerFactory<Entity extends ObjectLiteral>(
  entity: Type<Entity>,
  createDto: Type,
  updateDto: Type
): Type<WriteControllerInterface<Entity>> {
  const R = restPaths(entity.name)!;

  @ResourceName(entity.name)
  @UseFilters(RestExceptionFilter)
  @ApiTags(entity.name)
  @ApiBearerAuth()
  @Controller()
  class WriteController implements WriteControllerInterface<Entity> {
    constructor(
      @InjectWriteService(entity)
      protected readonly service: EntityWriteService<Entity>
    ) {}

    @ResourceOperationName(OperationName.WRITE)
    @ApiOperation({ summary: 'Save entity' })
    @ApiCreatedResponse({ type: entity, example: new entity() })
    @ApiBody({ type: createDto })
    @Post(R.singular)
    save(@Body() body: DeepPartial<Entity>) {
      return this.service.save(body);
    }

    @ResourceOperationName(OperationName.UPDATE)
    @ApiOperation({ summary: 'Update entity' })
    @ApiOkResponse({ type: UpdateResultDto, example: new UpdateResultDto() })
    @ApiBody({ type: updateDto })
    @Put(R.id)
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: QueryDeepPartialEntity<Entity>
    ) {
      return this.service.update(id, body);
    }

    @ResourceOperationName(OperationName.DELETE)
    @ApiOperation({ summary: 'Delete entity' })
    @ApiOkResponse({ type: DeleteResultDto, example: new DeleteResultDto() })
    @Delete(R.id)
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.service.delete(id);
    }

    @ResourceOperationName(OperationName.DELETE)
    @ApiOperation({ summary: 'Restore a deleted entity' })
    @ApiOkResponse({ type: UpdateResultDto, example: new UpdateResultDto() })
    @Post(R.id)
    restore(@Param('id', ParseIntPipe) id: number) {
      return this.service.restore(id);
    }
  }

  return WriteController;
}
