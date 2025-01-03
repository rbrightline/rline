import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Category,
  CreateCategoryDto,
  getDataSourceOptions,
  Sample,
  UpdateCategoryDto,
} from '@rline/orm';

import { RestModule } from '@rline/rest';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return getDataSourceOptions(config, [Sample, Category], []);
      },
    }),
    RestModule.register({
      type: 'all',
      entity: Sample,
      createDto: Sample,
      updateDto: Sample,
      relations: [Category],
    }),
    RestModule.register({
      type: 'all',
      entity: Category,
      createDto: CreateCategoryDto,
      updateDto: UpdateCategoryDto,
    }),
  ],
})
export class AppModule {}
