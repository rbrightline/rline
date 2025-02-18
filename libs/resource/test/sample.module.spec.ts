import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Sample } from '@rline/entity';
import {
  EntityService,
  getEntityServiceToken,
  NamingStrategy,
  provideEntityService,
} from '@rline/orm';
import { Equal } from 'typeorm';

describe('SampleModule', () => {
  let category: EntityService<Category>;
  let sample: EntityService<Sample>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          database: 'testdb',
          username: 'testuser',
          password: 'password',
          entities: [Sample, Category],
          namingStrategy: new NamingStrategy(),
          synchronize: true,
          dropSchema: true,
        }),
      ],
      providers: [provideEntityService(Sample), provideEntityService(Category)],
    }).compile();

    category = await module.get(getEntityServiceToken(Category));
    sample = await module.get(getEntityServiceToken(Sample));

    const cat1 = await category.save({ name: 'cat 1' });
    const cat2 = await category.save({ name: 'cat 2' });

    await sample.save({ name: 'sam 1', category: { id: cat1.id } });
    await sample.save({ name: 'sam 2', category: { id: cat2.id } });
  });

  it('should initialize', () => {
    expect(category).toBeDefined();
    expect(sample).toBeDefined();
  });

  it('should find by category id', async () => {
    const found = await sample.read({}, { category: Equal(2) }, {});
    expect(found[0].name).toEqual('sam 2');
  });
});
