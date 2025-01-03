import { Inject, Provider, Type } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { EntityQueryService } from './entity-query.service';
import { EntityRelationService } from './entity-relation.service';
import { EntityWriteService } from './entity-write.service';
import { getRepositoryToken } from '@nestjs/typeorm';

export function getQueryServiceToken(entity: Type): string {
  return `${entity.name}QueryServiceToken`;
}
export function getRelationServiceToken(entity: Type): string {
  return `${entity.name}RelationServiceToken`;
}
export function getWriteServiceToken(entity: Type): string {
  return `${entity.name}WriteServiceToken`;
}

export function provideQueryService<T extends ObjectLiteral>(
  entity: Type<T>
): Provider {
  return {
    inject: [getRepositoryToken(entity)],

    provide: getQueryServiceToken(entity),
    useFactory(repo: Repository<T>) {
      return new EntityQueryService(repo);
    },
  };
}

export function provideRelationService<T extends ObjectLiteral>(
  entity: Type<T>
): Provider {
  return {
    inject: [getRepositoryToken(entity)],
    provide: getRelationServiceToken(entity),
    useFactory(repo: Repository<T>) {
      return new EntityRelationService(repo);
    },
  };
}

export function provideWriteService<T extends ObjectLiteral>(
  entity: Type<T>
): Provider {
  return {
    inject: [getRepositoryToken(entity)],
    provide: getWriteServiceToken(entity),
    useFactory(repo: Repository<T>) {
      return new EntityWriteService(repo);
    },
  };
}

export function InjectQueryService<T extends ObjectLiteral>(
  entity: Type<T>
): ParameterDecorator {
  return (t, p, d) => {
    Inject(getQueryServiceToken(entity))(t, p, d);
  };
}
export function InjectRelationService<T extends ObjectLiteral>(
  entity: Type<T>
): ParameterDecorator {
  return (t, p, d) => {
    Inject(getRelationServiceToken(entity))(t, p, d);
  };
}
export function InjectWriteService<T extends ObjectLiteral>(
  entity: Type<T>
): ParameterDecorator {
  return (t, p, d) => {
    Inject(getWriteServiceToken(entity))(t, p, d);
  };
}
