// @index(['./**/*.ts', '!./**/*.{spec,test,d}.ts'], f => `export * from '${f.path}'`)
export * from './generators/api/api';
export * from './generators/controller/controller';
export * from './generators/dto/dto';
export * from './generators/entity/entity';
export * from './generators/init/init';
export * from './generators/model/model';
export * from './generators/sync/sync';
