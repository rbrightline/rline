import { Type } from '@nestjs/common';

export type ResourceControllerOptions = {
  entity: Type;
  queryDto: Type;
  createDto: Type;
  updateDto: Type;
  read: boolean;
  write: boolean;
  addRelation?: boolean;
  setRelation?: boolean;
  increment?: boolean;
};
