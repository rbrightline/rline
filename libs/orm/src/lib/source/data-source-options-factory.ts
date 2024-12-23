import { Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKey } from '@rline/type';

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
    synchronize: true,
    poolSize: 100,
  };
}
