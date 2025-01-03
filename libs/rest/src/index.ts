// @index(['./**/*.ts', '!./**/*.{spec,test}.ts'], f => `export * from '${f.path}'`)
export * from './lib/decorator/public-resource.metadata';
export * from './lib/decorator/resource-name.metadata';
export * from './lib/decorator/resource-operation-name.metadata';
export * from './lib/query-controller.factory';
export * from './lib/relation-controller.factory';
export * from './lib/rest-exception.filter';
export * from './lib/rest-module-options';
export * from './lib/rest.module';
export * from './lib/write-controller.factory';
