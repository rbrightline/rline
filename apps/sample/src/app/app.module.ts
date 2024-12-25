import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResourceModule } from '@rline/rest';
import {
  CreateOperationDto,
  datasourceOptionsFactory,
  Operation,
  UpdateOperationDto,
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
        return datasourceOptionsFactory(config, [Operation], []);
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
  ],
  providers: [],
})
export class AppModule {}
