import { DataSource } from 'typeorm';
import { EntityRepository } from './EntityRepository';
import { Sample } from '../entities/sample/Sample';
import { datasourceTestOptionsFactory } from '../source/data-source-options-factory';
describe('EntityRepository', () => {
  let ds: DataSource;
  let repo: EntityRepository<Sample>;

  beforeAll(async () => {
    ds = await new DataSource(
      datasourceTestOptionsFactory([], [])
    ).initialize();
    repo = new EntityRepository(ds.getRepository(Sample));
  });

  it('should initialize', () => expect(repo).toBeTruthy());
});
