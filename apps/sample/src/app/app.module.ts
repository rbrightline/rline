import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResourceModule } from '@rline/rest';
import {
  Category,
  CreateSampleDto,
  datasourceOptionsFactory,
  Operation,
  WhereSampleDto,
  Sample,
  UpdateSampleDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  WhereCategoryDto,
  AggregateCategoryDto,
  AggregateSampleDto,
  ByIdAggregateSampleDto,
} from '@rline/orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'class-transformer';
import 'class-validator';
import { ByIDAggregateCategoryDto } from '@rline/orm/lib/entities/category/QueryCategoryDto';

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
      entity: Category,
      createDto: CreateCategoryDto,
      updateDto: UpdateCategoryDto,
      whereDto: WhereCategoryDto,
      aggregateDto: AggregateCategoryDto,
      byIDAggregateDto: ByIDAggregateCategoryDto,
      read: true,
      write: true,
    }),
    ResourceModule.register({
      entity: Sample,
      createDto: CreateSampleDto,
      updateDto: UpdateSampleDto,
      whereDto: WhereSampleDto,
      aggregateDto: AggregateSampleDto,
      byIDAggregateDto: ByIdAggregateSampleDto,
      read: true,
      write: true,
      addRelation: true,
      setRelation: true,
      increment: true,
      queryRelation: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
