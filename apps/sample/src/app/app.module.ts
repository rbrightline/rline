import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResourceModule } from '@rline/rest';
import {
  AggreageSampleDto,
  Category,
  CreateSampleDto,
  datasourceOptionsFactory,
  Operation,
  WhereSampleDto,
  Sample,
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
      entity: Sample,
      createDto: CreateSampleDto,
      updateDto: UpdateSampleDto,
      whereDto: WhereSampleDto,
      aggregateDto: AggreageSampleDto,
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
