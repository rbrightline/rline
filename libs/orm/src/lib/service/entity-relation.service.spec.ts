import { describe, beforeEach } from 'vitest';
import { DataSource, Repository } from 'typeorm';
import { EntityRelationService } from './entity-relation.service';
import { Sample } from '../entities/sample/sample';
import { datasourceTestOptionsFactory } from '../source/data-source-options-factory';
import { Category } from '../entities/category/category';
import { repeat, rnd } from '@rline/utils';

describe('EntityRelationService', () => {
  let ds: DataSource;
  let samples: Sample[] = [];
  let categories: Category[] = [];

  let sampleRepo: Repository<Sample>;
  let categoryRepo: Repository<Category>;
  let sampleService: EntityRelationService<Sample>;

  beforeEach(async () => {
    ds = await new DataSource(
      datasourceTestOptionsFactory([Sample, Category], [])
    ).initialize();

    sampleRepo = ds.getRepository(Sample);
    categoryRepo = ds.getRepository(Category);

    sampleService = new EntityRelationService(sampleRepo);

    let categoryPromises = repeat(10, async (index) => {
      return categoryRepo.save({
        name: `category ${index + 1}`,
      });
    });

    let samplePromiess = repeat(10, async (index) => {
      let uniqueString = rnd();
      return sampleRepo.save({
        uniqueString,
        sampleString: `test ${index + 1}`,
        sampleNumber: index + 1,
        sampleInteger: index + 1,
        sampleDate: new Date(),
        sampleBoolean: true,
        sampleArray: ['test', 'test'],
      } as any);
    });

    const savedCategories = await Promise.all(categoryPromises);

    const savedSamples = await Promise.all(samplePromiess);

    samples.push(...savedSamples.sort((a, b) => a.id! - b.id!));
    categories.push(...savedCategories.sort((a, b) => a.id! - b.id!));
  });

  it('should be defined', () => {
    expect(ds).toBeDefined();
    expect(sampleRepo).toBeDefined();
    expect(categoryRepo).toBeDefined();
    expect(sampleService).toBeDefined();
    expect(samples).toBeDefined();
    expect(categories).toBeDefined();
  });

  it('should set relation', async () => {
    const result = await sampleService.setRelation({
      id: samples[0].id!,
      relationId: categories[0].id!,
      relationName: 'category',
    });

    expect(result.affected).toEqual(1);
  });

  it('should unset relation', async () => {
    const result = await sampleService.unsetRelation({
      id: samples[0].id!,
      relationName: 'category',
    });
    expect(result.affected).toEqual(1);
  });

  it('should add relation', async () => {
    const result = await sampleService.addRelation({
      id: samples[0].id!,
      relationId: categories[0].id!,
      relationName: 'categories',
    });

    expect(result.affected).toEqual(1);
  });
  it('should remove relation', async () => {
    const result = await sampleService.removeRelation({
      id: samples[0].id!,
      relationId: categories[0].id!,
      relationName: 'categories',
    });

    expect(result.affected).toEqual(1);
  });

  it('should count by relation', async () => {
    await sampleService.setRelation({
      id: samples[0].id!,
      relationId: categories[9].id!,
      relationName: 'category',
    });

    await sampleService.setRelation({
      id: samples[1].id!,
      relationId: categories[9].id!,
      relationName: 'category',
    });

    const result = await sampleService.countByRelation({
      relationId: categories[9].id!,
      relationName: 'category',
    });

    expect(result.count).toEqual(2);
  });

  it('should find by relation id', async () => {
    await sampleRepo
      .createQueryBuilder()
      .relation('category')
      .of(samples[0].id)
      .set(categories[0]);

    const found = await sampleService.findByRelation(
      {
        relationId: categories[0].id!,
        relationName: 'category',
      },
      {
        select: ['id', 'category'],
        loadEagerRelations: true,
      }
    );
    expect(found[0].id).toEqual(samples[0].id);
    expect(found[0].category?.id).toEqual(categories[0].id);
  });
});
