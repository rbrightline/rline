import { DynamicModule, Module } from '@nestjs/common';
import { RestModuleOptions } from './rest-module-options';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  provideQueryService,
  provideRelationService,
  provideWriteService,
} from '@rline/orm';
import { RelationControllerFactory } from './relation-controller.factory';
import { QueryControllerFactory } from './query-controller.factory';
import { WriteControllerFactory } from './write-controller.factory';

@Module({})
export class RestModule {
  static register(options: RestModuleOptions): DynamicModule {
    const { type } = options;

    if (type === 'query') {
      return {
        module: RestModule,
        imports: [
          TypeOrmModule.forFeature([
            options.entity,
            ...(options.relations || []),
          ]),
        ],
        providers: [provideQueryService(options.entity)],
        controllers: [QueryControllerFactory(options.entity)],
      };
    } else if (type === 'relation') {
      return {
        module: RestModule,
        imports: [
          TypeOrmModule.forFeature([
            options.entity,
            ...(options.relations || []),
          ]),
        ],
        providers: [provideRelationService(options.entity)],
        controllers: [RelationControllerFactory(options.entity)],
      };
    } else if (type === 'write') {
      return {
        module: RestModule,
        imports: [
          TypeOrmModule.forFeature([
            options.entity,
            ...(options.relations || []),
          ]),
        ],
        providers: [provideWriteService(options.entity)],
        controllers: [
          WriteControllerFactory(
            options.entity,
            options.createDto,
            options.updateDto
          ),
        ],
      };
    } else if (type == 'all') {
      return {
        module: RestModule,
        imports: [
          TypeOrmModule.forFeature([
            options.entity,
            ...(options.relations || []),
          ]),
        ],
        providers: [
          provideQueryService(options.entity),
          provideRelationService(options.entity),
          provideWriteService(options.entity),
        ],
        controllers: [
          QueryControllerFactory(options.entity),
          RelationControllerFactory(options.entity),
          WriteControllerFactory(
            options.entity,
            options.createDto,
            options.updateDto
          ),
        ],
      };
    }

    return { module: RestModule };
  }
}
