import { Controller, Delete, Get, Post, Put, Type } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResourceName } from './ResourceName';
import { parseResourceName } from './parse-resource-name';
import {
  OperationDelete,
  OperationRead,
  OperationUpdate,
  OperationWrite,
} from './OperationName';

export class ResourceControllerBuilder {
  protected readonly resourceName: string;

  constructor(protected readonly entity: Type) {
    this.resourceName = this.entity.name;
  }

  private resourceNames(t: Object): { singular: string; plural: string } {
    return parseResourceName(t.constructor.name);
  }

  private _one(t: Object) {
    return this.resourceNames(t).singular;
  }

  private _many(t: Object) {
    return this.resourceNames(t).plural;
  }

  private _id(t: Object) {
    return `${this._one(t)}/:id`;
  }

  private _relation(t: Object) {
    return `${this._one(t)}/:rn/:rid`;
  }

  private _unsetRelation(t: Object) {
    return `${this._one(t)}/:rn`;
  }

  Controller(): ClassDecorator {
    return (t) => {
      ResourceName()(t);
      Controller()(t);
      ApiTags(t.name)(t);
    };
  }

  Find(query: Type): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Find all ${this.resourceName}` })(t, p, d);
      Get(this._many(this.entity))(t, p, d);
      OperationRead(this.resourceName)(t, p, d);
      ApiQuery({ type: query })(t, p, d);
    };
  }

  FindOneById(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Find ${this.resourceName} by id` })(t, p, d);
      Get(this._id(this.entity))(t, p, d);
      OperationRead(this.resourceName)(t, p, d);
    };
  }

  Save(dto: Type): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Save ${this.resourceName}` })(t, p, d);
      Post(this._one(this.entity))(t, p, d);
      ApiBody({ type: dto })(t, p, d);
      OperationWrite(this.resourceName)(t, p, d);
    };
  }

  Update(dto: Type): MethodDecorator {
    return (t, p, d) => {
      const n = this.resourceNames(t).singular;
      ApiOperation({ summary: `Update ${n} by id` })(t, p, d);
      Put(this._id(t))(t, p, d);
      ApiBody({ type: dto })(t, p, d);
      OperationUpdate(this.resourceName)(t, p, d);
    };
  }

  Delete(): MethodDecorator {
    return (t, p, d) => {
      ApiOperation({ summary: `Delete ${this.resourceName} by id` })(t, p, d);
      Delete(this._id(this.entity))(t, p, d);
      OperationDelete(this.resourceName)(t, p, d);
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
    };
  }
}
