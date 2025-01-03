import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import {
  getQueryServiceToken,
  getRelationServiceToken,
  getWriteServiceToken,
  provideQueryService,
  provideRelationService,
  provideWriteService,
  InjectQueryService,
  InjectRelationService,
  InjectWriteService,
} from './entity-service.provider';
import { EntityQueryService } from './entity-query.service';
import { EntityRelationService } from './entity-relation.service';
import { EntityWriteService } from './entity-write.service';
import { getRepositoryToken } from '@nestjs/typeorm';

class TestEntity {}

describe('EntityServiceProvider', () => {
  let module: TestingModule;
  let repo: Repository<TestEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        provideQueryService(TestEntity),
        provideRelationService(TestEntity),
        provideWriteService(TestEntity),
        {
          provide: getRepositoryToken(TestEntity),
          useValue: {} as any,
        },
      ],
    }).compile();

    repo = module.get<Repository<TestEntity>>(getRepositoryToken(TestEntity));
  });

  it('should provide EntityQueryService', () => {
    const queryService = module.get(getQueryServiceToken(TestEntity));
    expect(queryService).toBeInstanceOf(EntityQueryService);
  });

  it('should provide EntityRelationService', () => {
    const relationService = module.get(getRelationServiceToken(TestEntity));
    expect(relationService).toBeInstanceOf(EntityRelationService);
  });

  it('should provide EntityWriteService', () => {
    const writeService = module.get(getWriteServiceToken(TestEntity));
    expect(writeService).toBeInstanceOf(EntityWriteService);
  });

  it('should inject EntityQueryService', () => {
    class TestClass {
      constructor(
        @InjectQueryService(TestEntity)
        public readonly service: EntityQueryService<any>
      ) {}
    }

    const testClass = new TestClass(
      module.get(getQueryServiceToken(TestEntity))
    );
    expect(testClass.service).toBeInstanceOf(EntityQueryService);
  });

  it('should inject EntityRelationService', () => {
    class TestClass {
      constructor(
        @InjectRelationService(TestEntity)
        public readonly service: EntityRelationService<any>
      ) {}
    }

    const testClass = new TestClass(
      module.get(getRelationServiceToken(TestEntity))
    );
    expect(testClass.service).toBeInstanceOf(EntityRelationService<any>);
  });

  it('should inject EntityWriteService', () => {
    class TestClass {
      constructor(
        @InjectWriteService(TestEntity)
        public readonly service: EntityWriteService<any>
      ) {}
    }

    const testClass = new TestClass(
      module.get<EntityWriteService<any>>(getWriteServiceToken(TestEntity))
    );
    expect(testClass.service).toBeInstanceOf(EntityWriteService);
  });
});
