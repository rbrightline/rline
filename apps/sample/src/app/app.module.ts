import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResourceModule } from '@rline/rest';
import {
  Category,
  CreateCategoryDto,
  CreateOperationDto,
  CreateSampleDto,
  datasourceOptionsFactory,
  Operation,
  QueryCategoryDto,
  QuerySampleDto,
  Sample,
  UpdateCategoryDto,
  UpdateOperationDto,
  UpdateSampleDto,
} from '@rline/orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'class-transformer';
import 'class-validator';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return datasourceOptionsFactory(
          config,
          [Operation, Sample, Category],
          []
        );
      },
    }),
    ResourceModule.register({
      entity: Operation,
      createDto: CreateOperationDto,
      updateDto: UpdateOperationDto,
      queryDto: Operation,
      read: true,
      write: true,
      addRelation: false,
      setRelation: false,
    }),
    ResourceModule.register({
      entity: Sample,
      createDto: CreateSampleDto,
      updateDto: UpdateSampleDto,
      queryDto: QuerySampleDto,
      read: true,
      write: true,
      addRelation: true,
      setRelation: true,
      increment: true,
    }),
    ResourceModule.register({
      entity: Category,
      createDto: CreateCategoryDto,
      updateDto: UpdateCategoryDto,
      queryDto: QueryCategoryDto,
      read: true,
      write: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
