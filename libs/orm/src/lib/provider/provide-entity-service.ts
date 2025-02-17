import { Inject, Provider, Type } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EntityService } from '../service';

export function getEntityServiceToken(entity: Type): string {
  return `${entity.name}${EntityService.name}`;
}

export function provideEntityService(entity: Type): Provider {
  return {
    inject: [DataSource],
    provide: getEntityServiceToken(entity),
    useFactory(ds: DataSource) {
      const repo = ds.getRepository(entity);
      return new EntityService(repo);
    },
  };
}

export function InjectEntityService(entity: Type): ParameterDecorator {
  return (t, p, d) => {
    Inject(getEntityServiceToken(entity))(t, p, d);
  };
}
