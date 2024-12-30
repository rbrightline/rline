import { describe } from 'vitest';
import { DataSource, Repository } from 'typeorm';
import { EntityWriteService } from './entity-write.service';
import { Sample } from '../entities/sample/sample';
import { datasourceTestOptionsFactory } from '../source/data-source-options-factory';
import { Category } from '../entities/category/category';
import { rnd } from '@rline/utils';

describe('EntityWriteService', () => {
  let service: EntityWriteService<Sample>;
  let repo: Repository<Sample>;
  let ds: DataSource;
  let toBeUpdated: Sample;
  let toBeDeleted: Sample;
  let toBeHardDeleted: Sample;

  beforeAll(async () => {
    ds = await new Promise((res, rej) => {
      setTimeout(() => {
        new DataSource(datasourceTestOptionsFactory([Sample, Category], []))
          .initialize()
          .then((ds) => res(ds))
          .catch(rej);
      }, 1000);
    });

    repo = ds.getRepository(Sample);
    service = new EntityWriteService(repo);

    toBeUpdated = await service.save({
      uniqueString: `${rnd()}`,
      sampleString: 'toBeUpdated',
    });
    toBeDeleted = await service.save({
      uniqueString: `${rnd()}`,
      sampleString: 'toBeDeleted',
    });
    toBeHardDeleted = await service.save({
      uniqueString: `${rnd()}`,
      sampleString: 'toBeHardDeleted',
    });
  });

  it('should intitialize', () => {
    expect(ds).toBeTruthy();
    expect(repo).toBeTruthy();
    expect(service).toBeTruthy();
    expect(toBeUpdated).toBeTruthy();
  });

  it('should save', async () => {
    const saved = await service.save({
      uniqueString: `${rnd()}`,
      sampleString: 'test 1',
    });
    expect(saved.id).toBeTruthy();
    expect(saved.sampleString).toEqual('test 1');
  });

  it('should update', async () => {
    const updated = await service.update(toBeUpdated.id!, {
      sampleString: 'updated',
    });

    expect(updated.affected).toEqual(1);
    expect(updated.data[0]).toEqual({ sampleString: 'toBeUpdated' });
    expect(updated.data[1]).toEqual({ sampleString: 'updated' });
  });

  it('should soft delete', async () => {
    const { affected, data, raw } = await service.delete(toBeDeleted.id!);
    const [oldData, newData] = data;

    expect(affected).toEqual(1);
    expect(raw).toBeTruthy();

    expect(oldData.id).toEqual(toBeDeleted.id);
    expect(newData.id).toEqual(oldData.id);

    expect(oldData.deletedAt).toBeFalsy();
    expect(newData.deletedAt).toBeTruthy();
  });

  it('should hard delete', async () => {
    const { affected, data, raw } = await service.delete(toBeHardDeleted.id!, {
      hardDelete: true,
    });
    const [oldData, newData] = data;

    expect(affected).toEqual(1);
    expect(raw).toBeTruthy();

    expect(oldData.id).toEqual(toBeHardDeleted.id);
    expect(newData).toBeFalsy();
    expect(oldData.deletedAt).toBeFalsy();
  });

  it('should restore', async () => {
    try {
      await service.delete(toBeDeleted.id!);
    } catch (err) {}
    const { affected, data, raw } = await service.restore(toBeDeleted.id!);

    const [oldData, newData] = data;

    expect(affected).toEqual(1);
    expect(raw).toBeTruthy();

    expect(oldData.id).toEqual(toBeDeleted.id);
    expect(newData.id).toEqual(toBeDeleted.id);
    expect(oldData.deletedAt).toBeTruthy();
    expect(newData.deletedAt).toBeFalsy();
  });
});
