import { EntityService } from './EntityService';
import { Sample } from './../entities/sample/Sample';
import { CreateSampleDto } from './../entities/sample/CreateSampleDto';
import { DataSource } from 'typeorm';
import { Category } from '../entities/category/Category';

describe('EntityService', () => {
  let service: EntityService<Sample>;
  let saved: Sample;

  let sampleData = new CreateSampleDto();
  sampleData.sampleString = 'sample string';
  sampleData.sampleNumber = 100;
  sampleData.sampleInteger = 100;
  sampleData.sampleBoolean = true;
  sampleData.sampleDate = new Date();
  sampleData.sampleObject = { property: 'property', value: 'value' };
  sampleData.sampleArray = ['first', 'second'];

  beforeAll(async () => {
    const ds = await new DataSource({
      type: 'postgres',
      entities: [Sample, Category],
      database: 'testdb',
      username: 'testuser',
      password: 'password',
      dropSchema: true,
      synchronize: true,
    }).initialize();

    service = new EntityService(ds.getRepository(Sample));

    saved = await service.save(sampleData as Sample);

    await service.save(new CreateSampleDto() as Sample);

    await service.save(new CreateSampleDto() as Sample);
  });

  it('should create', () => {
    expect(saved).toBeTruthy();
    expect(saved.active).toEqual(true);
    expect(saved.sampleString).toEqual(sampleData.sampleString);
    expect(saved.sampleNumber).toEqual(sampleData.sampleNumber + '');
    expect(saved.sampleInteger).toEqual(sampleData.sampleInteger);
    expect(saved.sampleBoolean).toEqual(sampleData.sampleBoolean);
    expect(saved.sampleArray).toEqual(sampleData.sampleArray);
    expect(saved.sampleObject).toEqual(sampleData.sampleObject);
    expect(saved.sampleDate).toEqual(sampleData.sampleDate?.toISOString());
  });

  it('should find all', async () => {
    const found = await service.find({}, {});
    expect(found).toBeTruthy();
    expect(found.length).toBeGreaterThan(0);
    if (found[0]!) {
      expect(found[0].active).toEqual(true);
      expect(found[0].sampleString).toEqual(sampleData.sampleString);
      expect(found[0].sampleNumber).toEqual(sampleData.sampleNumber + '');
      expect(found[0].sampleInteger).toEqual(sampleData.sampleInteger);
      expect(found[0].sampleBoolean).toEqual(sampleData.sampleBoolean);
      expect(found[0].sampleArray).toEqual(sampleData.sampleArray);
      expect(found[0].sampleObject).toEqual(sampleData.sampleObject);
      expect(found[0].sampleDate).toEqual(sampleData.sampleDate?.toISOString());
    }
  });

  it('should find one by id', async () => {
    const found = await service.findOneById(1, {});
    expect(found).toBeTruthy();

    if (found) {
      expect(found.active).toEqual(true);
      expect(found.sampleString).toEqual(sampleData.sampleString);
      expect(found.sampleNumber).toEqual(sampleData.sampleNumber + '');
      expect(found.sampleInteger).toEqual(sampleData.sampleInteger);
      expect(found.sampleBoolean).toEqual(sampleData.sampleBoolean);
      expect(found.sampleArray).toEqual(sampleData.sampleArray);
      expect(found.sampleObject).toEqual(sampleData.sampleObject);
      expect(found.sampleDate).toEqual(sampleData.sampleDate?.toISOString());
    }
  });

  it('should upate', async () => {
    const updated = await service.update(1, { sampleString: 'Updated' });
    expect(updated.data).toBeTruthy();
  });
});
