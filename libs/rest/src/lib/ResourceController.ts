import { Body } from '@nestjs/common';
import { EntityService, InjectEntityService } from '@rline/orm';
import { ResourceControllerBuilder } from './ResourceControllerBuilder';

export function ResourceController(entity: any) {
  const Rest = new ResourceControllerBuilder(entity);
  
  @Rest.Controller()
  class __ResourceController {
    constructor(
      @InjectEntityService(entity) public readonly service: EntityService<any>
    ) {}

    @Rest.Save(entity)
    Save(@Body() entity: any) {
      return this.service.save(entity);
    }

    @Rest.Find(entity)
    Find() {}

    @Rest.FindOneById()
    FindOneById() {
      return [];
    }

    @Rest.Update(entity)
    Update() {
      return [];
    }

    @Rest.Delete()
    Delete() {
      return [];
    }

    @Rest.AddRelation()
    AddRelation() {
      return [];
    }

    @Rest.RemoveRelation()
    RemoveRelation() {
      return [];
    }

    @Rest.SetRelation()
    SetRelation() {
      return [];
    }

    @Rest.UnsetRelation()
    UnsetRelation() {
      return [];
    }
  }

  return __ResourceController;
}
