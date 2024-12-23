import { Inject, Provider, Type } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityService } from './EntityService';

export function getEntityServiceToken(entity: Type) {
  return `${entity.name}ServiceToken`;
}

export function provideEntityService<T extends {}>(entity: Type): Provider {
  return {
    provide: getEntityServiceToken(entity),
    inject: [getRepositoryToken(entity)],
    useFactory(repo: Repository<T>) {
      return new EntityService(repo);
    },
  };
}

export function InjectEntityService(entity: Type): ParameterDecorator {
  return (t, p, d) => {
    Inject(getEntityServiceToken(entity))(t, p, d);
  };
}
