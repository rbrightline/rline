import { Type } from '@nestjs/common';

export type ResourceControllerOptions = {
  entity: Type;
  whereDto: Type;
  aggregateDto: Type;
  createDto: Type;
  updateDto: Type;
  read: boolean;
  write: boolean;
  addRelation?: boolean;
  setRelation?: boolean;
  queryRelation?: boolean;
  increment?: boolean;
};
