import { describe } from 'vitest';
import { DataSource, ILike, MoreThan, Repository } from 'typeorm';
import { EntityQueryService } from './enetity-query.service';
import { datasourceTestOptionsFactory } from '../source/data-source-options-factory';
import { Sample } from '../entities/sample/sample';
import { Category } from '../entities/category/category';
import { repeat, rnd } from '@rline/utils';

describe('EntityQueryService', () => {
  let ds: DataSource;
  let sampleService: EntityQueryService<any>;
  let sampleRepo: Repository<any>;
  let samples: Sample[] = [];

  beforeAll(async () => {
    ds = await new DataSource(
      datasourceTestOptionsFactory([Sample, Category], [])
    ).initialize();

    sampleRepo = ds.getRepository(Sample);
    sampleService = new EntityQueryService(sampleRepo);

    let samplePromiess = repeat(10, async (index) => {
      let uniqueString = rnd();
      return sampleRepo.save({
        uniqueString,
        sampleString: `test ${index}`,
        sampleNumber: index,
        sampleInteger: index,
        sampleDate: new Date(),
        sampleBoolean: true,
        sampleArray: ['test', 'test'],
      });
    });

    const savedSamples = await Promise.all(samplePromiess);

    samples.push(...savedSamples.sort((a, b) => a.id - b.id));
  });

  it('should be defined', () => {
    expect(sampleService).toBeDefined();
    expect(sampleService.findAll).toBeDefined();
    expect(sampleService.findOne).toBeDefined();
    expect(sampleService.count).toBeDefined();
  });

  it('should find all entities', async () => {
    const entities = await sampleService.findAll({});
    expect(entities).toBeDefined();
    expect(entities.length).toEqual(samples.length);
  });

  it('should find by pagination', async () => {
    const entities = await sampleService.findAll({
      take: 5,
      skip: 3,
    });

    expect(entities).toBeDefined();
    expect(entities.length).toEqual(5);
    expect(entities[0].id).toEqual(samples[3].id);
  });

  it('should find by order', async () => {
    const entities = await sampleService.findAll({
      order: { id: 'DESC' },
    });

    expect(entities).toBeDefined();
    expect(entities.length).toEqual(samples.length);
    expect(entities[0].id).toEqual(samples[samples.length - 1].id);
  });

  it('should find by where string property', async () => {
    const entities = await sampleService.findAll({
      where: { sampleString: ILike('test 1') },
    });

    expect(entities).toBeDefined();
    expect(entities.length).toEqual(1);
  });

  it('should find by where number property', async () => {
    const entities = await sampleService.findAll({
      where: { sampleNumber: MoreThan(-1) },
    });

    expect(entities).toBeDefined();
    expect(entities.length).toEqual(10);
  });

  it('should select fields', async () => {
    const entities = await sampleService.findAll({
      select: ['id', 'sampleString'],
    });

    expect(entities).toBeDefined();
    expect(entities.length).toEqual(samples.length);
    expect(entities[0].id).toBeDefined();
    expect(entities[0].sampleString).toBeDefined();
    expect(entities[0].sampleNumber).toBeUndefined();
  });

  it('should find one entity', async () => {
    const entity = await sampleService.findOne({
      where: { id: samples[0].id },
    });

    expect(entity).toBeDefined();
    expect(entity.id).toEqual(samples[0].id);
  });

  it('should count entities', async () => {
    let count = await sampleService.count({
      where: { sampleString: ILike('test%') },
    });
    expect(count).toEqual({ count: 10 });
    count = await sampleService.count({
      where: { sampleString: ILike('test 1') },
    });
    expect(count).toEqual({ count: 1 });
  });
});
