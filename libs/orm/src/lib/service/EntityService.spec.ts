import { EntityService } from './EntityService';
import { Sample } from './../entities/sample/Sample';
import { DataSource } from 'typeorm';
import { datasourceTestOptionsFactory } from './../source/data-source-options-factory';
import { Category } from '../entities/category/Category';

describe('EntityService', () => {
  let service!: EntityService<Sample>;
  let savedData: Sample[] = [];

  beforeAll(async () => {
    const ds = await new DataSource(
      datasourceTestOptionsFactory([Sample, Category], [])
    ).initialize();

    service = new EntityService(ds.getRepository(Sample));
  });

  it('should initialize service', () => expect(service).toBeTruthy());

  describe('crud', () => {
    beforeAll(async () => {
      savedData.push(await service.save({ sampleString: 'sampleString' }));
      savedData.push(await service.save({ sampleNumber: 100.99 }));
      savedData.push(await service.save({ sampleInteger: 100 }));
      savedData.push(await service.save({ sampleDate: new Date() }));
      savedData.push(await service.save({ sampleObject: { value: 'value' } }));
      savedData.push(await service.save({ sampleBoolean: true }));
      savedData.push(await service.save({ sampleArray: ['a', 'b', 'c', 'd'] }));
    });

    it('should create', () => {
      expect(savedData.length).toBeGreaterThan(0);
    });

    it('should find', async () => {
      const founds = await service.find({}, {});
      expect(founds.length).greaterThan(0);
    });

    it('should find one by id', async () => {
      const found = await service.findOneById(1);
      expect(found).toBeTruthy();
    });
  });
});
