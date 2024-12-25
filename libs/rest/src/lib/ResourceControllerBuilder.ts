import { Controller, Delete, Get, Post, Put, Type } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ResourceName } from './ResourceName';
import { parseResourceName } from './parse-resource-name';
import {
  OperationDelete,
  OperationRead,
  OperationUpdate,
  OperationWrite,
} from './OperationName';

import {
  CountDto,
  IncrementDto,
  CreateUpdateResultDto,
  CreateDeleteResultDto,
  DecrementDto,
} from '@rline/orm';

export class ResourceControllerBuilder {
  protected readonly resourceName: string;

  constructor(
    protected readonly entity: Type,
    protected readonly createDto: Type,
    protected readonly updateDto: Type,
    protected readonly queryDto: Type
  ) {
    this.resourceName = this.entity.name;
  }

  private rn(): { singular: string; plural: string } {
    return parseResourceName(this.resourceName);
  }

  private _one() {
    return this.rn().singular;
  }

  private _many() {
    return this.rn().plural;
  }

  private _id() {
    return `${this._one()}/:id`;
  }

  private _relation(t: Type) {
    return `${this._one()}/:rn/:rid`;
  }

  private _unsetRelation(t: Type) {
    return `${this._one()}/:rn`;
  }

  Controller(): ClassDecorator {
    return (t) => {
      Controller()(t);
      ApiBearerAuth()(t);
      ApiTags(this.resourceName + 'Controller')(t);
      ResourceName(this.resourceName)(t);
    };
  }

  Find(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Find all ${this.resourceName}` })(t, p, d);
      Get(this._many())(t, p, d);
      OperationRead(this.resourceName)(t, p, d);
      ApiQuery({ type: this.queryDto })(t, p, d);
      ApiOkResponse({ type: this.entity, isArray: true })(t, p, d);
    };
  }

  FindOneById(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Find ${this.resourceName} by id` })(t, p, d);
      OperationRead(this.resourceName)(t, p, d);
      Get(this._id())(t, p, d);
      ApiOkResponse({ type: this.entity })(t, p, d);
    };
  }

  Save(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Save ${this.resourceName}` })(t, p, d);
      Post(this._one())(t, p, d);
      ApiBody({ type: this.createDto })(t, p, d);
      OperationWrite(this.resourceName)(t, p, d);
      ApiOkResponse({ type: this.entity })(t, p, d);
    };
  }

  Update(): MethodDecorator {
    return (t, p, d) => {
      const n = this.rn().singular;
      ApiOperation({ summary: `Update ${n} by id` })(t, p, d);
      Put(this._id())(t, p, d);
      ApiBody({ type: this.updateDto })(t, p, d);
      OperationUpdate(this.resourceName)(t, p, d);
      ApiOkResponse({
        type: CreateUpdateResultDto(this.entity),
        example: new (CreateUpdateResultDto(this.entity))(),
      })(t, p, d);
    };
  }

  Delete(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Delete ${this.resourceName} by id` })(t, p, d);
      Delete(this._id())(t, p, d);
      OperationDelete(this.resourceName)(t, p, d);
      ApiOkResponse({
        type: CreateDeleteResultDto(this.entity),
        example: [new this.entity()],
      })(t, p, d);
    };
  }

  AddRelation(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Add relation to ${this.resourceName}` })(
        t,
        p,
        d
      );
      Put(this._relation(this.entity))(t, p, d);
      OperationUpdate(this.resourceName)(t, p, d);
      ApiOkResponse({ type: this.entity })(t, p, d);
    };
  }

  RemoveRelation(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Remove relation from ${this.resourceName}` })(
        t,
        p,
        d
      );
      Delete(this._relation(this.entity))(t, p, d);
      OperationUpdate(this.resourceName)(t, p, d);
      ApiOkResponse({ type: this.entity })(t, p, d);
    };
  }

  SetRelation(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Set relation to ${this.resourceName}` })(
        t,
        p,
        d
      );
      Post(this._relation(this.entity))(t, p, d);
      OperationUpdate(this.resourceName)(t, p, d);
      ApiOkResponse({ type: this.entity })(t, p, d);
    };
  }

  UnsetRelation(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Unset relation from ${this.resourceName}` })(
        t,
        p,
        d
      );
      Delete(this._unsetRelation(this.entity))(t, p, d);
      OperationUpdate(this.resourceName)(t, p, d);
      ApiOkResponse({ type: this.entity })(t, p, d);
    };
  }

  Count(): MethodDecorator {
    return (t, p, d) => {
      const n = this.rn().singular;
      ApiOperation({ summary: `Count ${n}` })(t, p, d);
      Get(this._many() + '/count')(t, p, d);
      ApiQuery({ type: this.queryDto })(t, p, d);
      OperationRead(this.resourceName)(t, p, d);
      ApiOkResponse({ type: CountDto })(t, p, d);
    };
  }

  Increment(): MethodDecorator {
    return (t, p, d) => {
      const n = this.rn().singular;
      ApiOperation({ summary: `Increment ${n}` })(t, p, d);
      Put(this._many() + '/:id/increment')(t, p, d);
      ApiBody({ type: IncrementDto })(t, p, d);
      OperationUpdate(this.resourceName)(t, p, d);
      ApiOkResponse({ type: CreateUpdateResultDto(this.entity) })(t, p, d);
    };
  }
  Decrement(): MethodDecorator {
    return (t, p, d) => {
      const n = this.rn().singular;
      ApiOperation({ summary: `Decrement ${n}` })(t, p, d);
      Put(this._many() + '/:id/decrement')(t, p, d);
      ApiBody({ type: DecrementDto })(t, p, d);
      OperationUpdate(this.resourceName)(t, p, d);
      ApiOkResponse({ type: CreateUpdateResultDto(this.entity) })(t, p, d);
    };
  }
}
