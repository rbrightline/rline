import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEntityServiceToken, provideEntityService } from '@rline/orm';
import { ResourceController } from './ResourceController';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class ResourceModule {
  static register(entities: Type[]): DynamicModule {
    const exports = entities.map((e) => getEntityServiceToken(e));
    const providers = entities.map((e) => provideEntityService(e));
    const controllers = entities.map((e) => ResourceController(e));

    return {
      module: ResourceModule,
      imports: [ConfigModule, TypeOrmModule.forFeature(entities)],
      controllers: [...controllers],
      providers: [...providers],
      exports: [...exports, TypeOrmModule],
    };
  }
}
