import { MoreThan, Repository } from 'typeorm';
import { describe } from 'vitest';
import { Sample } from '../entities/sample/sample.entity';
import { getTestDataSourceInstance } from '../source/data-source';
import { Category } from '../entities/category/category';
import { repeat } from '@rline/utils';
import { EntityQueryService } from './entity-query.service';
import { EntityRelationService } from './entity-relation.service';
import { EntityWriteService } from './entity-write.service';

describe('EntityService', () => {
  let sampleRepo: Repository<Sample>;
  let categoryRepo: Repository<Category>;
  let queryService: EntityQueryService<Sample>;
  let relationService: EntityRelationService<Sample>;
  let writeService: EntityWriteService<Sample>;
  let samples: Sample[] = [];
  let categories: Category[] = [];

  beforeAll(async () => {
    const ds = await getTestDataSourceInstance([Sample, Category]);
    expect(ds).toBeDefined();

    sampleRepo = ds.getRepository(Sample);
    categoryRepo = ds.getRepository(Category);

    await sampleRepo.delete({ id: MoreThan(0) });
    await categoryRepo.delete({ id: MoreThan(0) });

    const samplePromises: Promise<Sample>[] = [];
    const categoryPromises: Promise<Category>[] = [];

    repeat(5, async (i) => {
      const category = categoryRepo.save({ name: `cat ${i}` });
      categoryPromises.push(category);
    });

    repeat(5, (i) => {
      const sample = sampleRepo.save({
        uniqueString: `unique string ${i}`,
        sampleString: 'sample string',
        sampleBoolean: true,
        sampleNumber: i,
        sampleDate: new Date(),
        sampleObject: { property: 'color', value: 'red' },
        sampleInteger: 10,
        sampleArray: ['red', 'green', 'blue'],
        info: 'info',
      });

      samplePromises.push(sample);
    });

    categories = await Promise.all(categoryPromises);
    samples = await Promise.all(samplePromises);

    queryService = new EntityQueryService(sampleRepo);
    relationService = new EntityRelationService(sampleRepo);
    writeService = new EntityWriteService(sampleRepo);
  });

  afterAll(async () => {
    await sampleRepo.delete({ id: MoreThan(0) });
    await categoryRepo.delete({ id: MoreThan(0) });
  });

  it('should initialize', () => {
    expect(sampleRepo).toBeDefined();
    expect(categoryRepo).toBeDefined();
    expect(queryService).toBeDefined();
  });

  describe('EntityQueryService', () => {
    it('should find all', async () => {
      const result = await queryService.findAll({});

      expect(result).toBeDefined();
      expect(result.length).toEqual(samples.length);
      expect(result[0].uniqueString).toBeTruthy();
      expect(result[0].sampleString).toBeTruthy();
      expect(result[0].sampleBoolean).toBeTruthy();
      expect(result[0].sampleArray).toBeTruthy();
      expect(result[0].sampleDate).toBeTruthy();
      expect(result[0].sampleInteger).toBeTruthy();
      expect(result[0].sampleNumber).toBeTruthy();
      expect(result[0].sampleObject).toBeTruthy();
    });

    it('should find by take and skip', async () => {
      const results = [
        queryService.findAll({ take: 2, skip: 0 }),
        queryService.findAll({ take: 2, skip: 1 }),
      ];
      const [result1, result2] = await Promise.all(results);

      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
      expect(result1.length).toEqual(2);
      expect(result2.length).toEqual(2);
      expect(result1[1]).toEqual(result2[0]);
    });

    it('should find by select', async () => {
      const result = await queryService.findAll({
        select: ['id', 'uniqueString'],
        take: 1,
      });
      expect(result).toBeDefined();
      expect(result.length).toEqual(1);
    });
  });

  describe('EntityRelationService', () => {
    it('should add/remove relation', async () => {
      let result = await relationService.addRelation({
        id: samples[0].id!,
        relationId: categories[0].id!,
        relationName: 'categories',
      });

      expect(result).toBeDefined();
      expect(result.affected).toBe(1);
      expect(result.data).toBeDefined();
      expect(result.data[1].categories[0].id).toBe(categories[0].id);

      result = await relationService.removeRelation({
        id: samples[0].id!,
        relationId: categories[0].id!,
        relationName: 'categories',
      });

      expect(result).toBeDefined();
      expect(result.affected).toBe(1);
      expect(result.data).toBeDefined();
      expect(result.data[1].categories.length).toBe(0);
    });

    it('should set/unset relation', async () => {
      let result = await relationService.setRelation({
        id: samples[0].id!,
        relationId: categories[0].id!,
        relationName: 'category',
      });

      expect(result).toBeDefined();
      expect(result.affected).toBe(1);
      expect(result.data).toBeDefined();
      expect(result.data[1].category.id).toBe(categories[0].id);

      result = await relationService.unsetRelation({
        id: samples[0].id!,
        relationName: 'category',
      });

      expect(result).toBeDefined();
      expect(result.affected).toBe(1);
      expect(result.data).toBeDefined();
      expect(result.data[1].category).toBeNull();
    });

    it('should find by relation', async () => {
      await relationService.setRelation({
        id: samples[0].id!,
        relationId: categories[0].id!,
        relationName: 'category',
      });
      await relationService.setRelation({
        id: samples[1].id!,
        relationId: categories[0].id!,
        relationName: 'category',
      });

      const found = await relationService.findByRelation(
        {
          relationId: categories[0].id!,
          relationName: 'category',
        },
        {}
      );

      expect(found).toBeDefined();
      expect(found.length).toBe(2);

      await relationService.unsetRelation({
        id: samples[0].id!,
        relationName: 'category',
      });
      await relationService.unsetRelation({
        id: samples[1].id!,
        relationName: 'category',
      });
    });
    it('should count by relation', async () => {
      await relationService.setRelation({
        id: samples[0].id!,
        relationId: categories[0].id!,
        relationName: 'category',
      });
      await relationService.setRelation({
        id: samples[1].id!,
        relationId: categories[0].id!,
        relationName: 'category',
      });

      const { count } = await relationService.countByRelation({
        relationId: categories[0].id!,
        relationName: 'category',
      });

      expect(count).toBe(2);

      await relationService.unsetRelation({
        id: samples[0].id!,
        relationName: 'category',
      });
      await relationService.unsetRelation({
        id: samples[1].id!,
        relationName: 'category',
      });
    });
  });

  describe('EntityWriteService', () => {
    it('should update', async () => {
      const result = await writeService.update(samples[0].id!, {
        sampleString: 'new string',
      });

      expect(result).toBeDefined();

      expect(result.affected).toBe(1);
      expect(result.data).toBeDefined();
      expect(result.data[1].sampleString).toBe('new string');
    });

    it('should delete/restore', async () => {
      const result = await writeService.delete(samples[0].id!);

      expect(result).toBeDefined();
      expect(result.affected).toBe(1);
      expect(result.data).toBeDefined();
      expect(result.data[1].deletedAt).toBeDefined();

      const restored = await writeService.restore(samples[0].id!);

      expect(restored).toBeDefined();
      expect(restored.affected).toBe(1);
      expect(restored.data).toBeDefined();
      expect(restored.data[1].deletedAt).toBeNull();
    });
  });
});
