import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResourceModule } from '@rline/rest';
import { datasourceOptionsFactory, Operation } from '@rline/orm';
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
    ResourceModule.register([Operation]),
  ],
  providers: [],
})
export class AppModule {}
