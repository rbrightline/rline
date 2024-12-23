import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigKey } from '@rline/type';

@Injectable()
export class DatasourceFactory implements TypeOrmOptionsFactory {
  logger = new Logger(DatasourceFactory.name);

  constructor(protected readonly config: ConfigService) {}
  
  createTypeOrmOptions(cn?: string): TypeOrmModuleOptions {
    const database = this.config.get(ConfigKey.DB_NAME, 'testdb');
    const username = this.config.get(ConfigKey.DB_USERNAME, 'testuser');
    const password = this.config.get(ConfigKey.DB_PASSWORD, 'password');

    console.table({
      database,
      username,
      password,
    });

    return {
      type: 'postgres',
      database,
      username,
      password,
      autoLoadEntities: true,
    };
  }
}
