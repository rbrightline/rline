import { EntityService } from './EntityService';
import { Sample } from './../entities/sample/Sample';
import { DataSource } from 'typeorm';
import { datasourceTestOptionsFactory } from './../source/data-source-options-factory';
import { Category } from '../entities/category/Category';

describe('EntityService', () => {
  let service!: EntityService<Sample>;
  let saved: Sample;
  let sampleDat;

  beforeAll(async () => {
    const ds = await new DataSource(
      datasourceTestOptionsFactory([Sample, Category], [])
    ).initialize();

    service = new EntityService(ds.getRepository(Sample));

    saved = await service.save({
      sampleString: 'sample string',
      sampleNumber: 100,
      sampleInteger: 200,
    } as any);
  });

  it('should initialize service', () => expect(service).toBeTruthy());

  it('should create', async () => {
    expect(saved.sampleString).toEqual();
  });

  it('should find all', async () => {
    const founds = await service.find();
    expect(founds).toBeTruthy();
    expect(founds.length).toBeGreaterThan(0);
  });

  it('should find all by select', async () => {
    const founds = await service.find({ select: ['id'] });
    expect(Object.keys(founds[0])).toEqual(['id']);
  });

  it('should find one by id', async () => {
    const found = await service.findOneById(1);
    expect(found).toBeTruthy();
  });
});
