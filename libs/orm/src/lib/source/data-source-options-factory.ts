import { Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKey } from '@rline/type';
import { DataSourceOptions } from 'typeorm';
import { DatabaseNamingStrategy } from '../orm/NamingStrategy';

/**
 * Configure the database
 * @param config
 * @param entities
 * @param subscribers
 * @returns
 */
export function datasourceOptionsFactory(
  config: ConfigService,
  entities: Type[],
  subscribers: Type[]
): TypeOrmModuleOptions {
  const database = config.get(ConfigKey.DB_NAME, 'testdb');
  const username = config.get(ConfigKey.DB_USERNAME, 'testuser');
  const password = config.get(ConfigKey.DB_PASSWORD, 'password');

  return {
    type: 'postgres',
    database,
    username,
    password,
    entities: entities,
    subscribers: subscribers,
    entitySkipConstructor: true,
    poolSize: 100,
    namingStrategy: new DatabaseNamingStrategy(),
  };
}

/**
 * Configure the database
 * @param config
 * @param entities
 * @param subscribers
 * @returns
 */
export function datasourceTestOptionsFactory(
  entities: Type[],
  subscribers: Type[]
): DataSourceOptions {
  return {
    type: 'postgres',
    database: 'testdb',
    username: 'testuser',
    password: 'password',
    entities: entities,
    subscribers: subscribers,
    entitySkipConstructor: true,
    synchronize: true,
    poolSize: 100,
    namingStrategy: new DatabaseNamingStrategy(),
  };
}
