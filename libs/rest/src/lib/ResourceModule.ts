import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEntityServiceToken, provideEntityService } from '@rline/orm';
import { CreateResourceController } from './CreateResourceController';
import { ConfigModule } from '@nestjs/config';
import { ResourceModuleOptions } from './ResourceModuleOptions';

@Module({})
export class ResourceModule {
  static register(options: ResourceModuleOptions): DynamicModule {
    const exports = [getEntityServiceToken(options.entity)];
    const services = [provideEntityService(options.entity)];

    const controllers = CreateResourceController(options);

    return {
      module: ResourceModule,
      imports: [ConfigModule, TypeOrmModule.forFeature([options.entity])],
      controllers: [...controllers],
      providers: [...services],
      exports: [...exports, TypeOrmModule],
    };
  }
}
