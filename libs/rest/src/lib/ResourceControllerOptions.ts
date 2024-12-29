import { Type } from '@nestjs/common';

export type ResourceControllerOptions = {
  entity: Type;
  createDto: Type;
  updateDto: Type;
  whereOptionsDto: Type;
  findOptionsDto: Type;
  read: boolean;
  write: boolean;
  addRelation?: boolean;
  setRelation?: boolean;
  queryRelation?: boolean;
  increment?: boolean;
};
