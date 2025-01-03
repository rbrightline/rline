import { Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKeys } from '@rline/type';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseNamingStrategy } from '../orm/naming.strategy';

/**
 * Configure the database
 * @param config
 * @param entities
 * @param subscribers
 * @returns
 */
export function getDataSourceOptions(
  config: ConfigService,
  entities: Type[],
  subscribers: Type[]
): TypeOrmModuleOptions {
  const DB_NAME = config.getOrThrow(ConfigKeys.DB_NAME);
  const DB_USERNAME = config.getOrThrow(ConfigKeys.DB_USERNAME);
  const DB_PASSWORD = config.getOrThrow(ConfigKeys.DB_PASSWORD);

  return {
    type: 'postgres',
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: entities,
    subscribers: subscribers,
    entitySkipConstructor: true,
    logging: false,
    namingStrategy: new DatabaseNamingStrategy(),
    extra: {
      max: 10, // Max connections in the pool
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    },
  };
}

/**
 * Configure the database
 * @param config
 * @param entities
 * @param subscribers
 * @returns
 */
export function getTestDataSourceOptions(
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
    logging: false,
    namingStrategy: new DatabaseNamingStrategy(),
    extra: {
      max: 20, // Max connections in the pool
      idleTimeoutMillis: 1, // Close idle connections after 1 seconds
    },
  };
}

export async function getTestDataSourceInstance(
  entities: Type[]
): Promise<DataSource> {
  return await new DataSource(
    getTestDataSourceOptions([...entities], [])
  ).initialize();
}
