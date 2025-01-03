import { Type } from '@nestjs/common';

export type QueryRestModuleOptions = {
  type: 'query';
  entity: Type;
  relations?: Type[];
};

export type RelationRestModuleOptions = {
  type: 'relation';
  entity: Type;
  relations?: Type[];
};

export type WriteRestModuleOptions = {
  type: 'write';
  entity: Type;
  createDto: Type;
  updateDto: Type;
  relations?: Type[];
};

export type AllRestModuleOptions = {
  type: 'all';
  entity: Type;
  createDto: Type;
  updateDto: Type;
  relations?: Type[];
};

export type RestModuleOptions =
  | QueryRestModuleOptions
  | RelationRestModuleOptions
  | WriteRestModuleOptions
  | AllRestModuleOptions;
