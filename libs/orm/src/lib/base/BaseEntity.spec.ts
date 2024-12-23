import { str } from '@rline/type';
import { DataSource, Equal, ILike, MoreThan, Repository } from 'typeorm';
import { Entity } from '../orm/Entity';
import { Column } from '../orm/Column';
import { IDEntity } from './IDEntity';
describe('BaseEntity', () => {
  @Entity()
  class Sample extends IDEntity<Sample> {
    @Column({ type: 'string' }) name = str();
  }
  const value = new Sample();

  describe('structure', () => {
    it('keys() should return all keys', () => {
      expect(Object.keys(value).sort((a, b) => a.localeCompare(b))).toEqual(
        ['id', 'name'].sort((a, b) => a.localeCompare(b))
      );
    });
  });

  describe('crud', () => {
    let ds: DataSource;
    let repo: Repository<Sample>;
    let saved: Sample;
    beforeAll(async () => {
      ds = await new DataSource({
        type: 'postgres',
        database: 'testdb',
        username: 'testuser',
        password: 'password',
        entities: [Sample],
        synchronize: true,
      }).initialize();

      repo = ds.getRepository(Sample);

      saved = await repo.save({ name: 'some' } as Sample);

      expect(saved).toBeTruthy();
    });

    it('should create entity', () => {
      expect(saved).toBeTruthy();
    });

    it('should initialize the datasource', () => {
      expect(ds).toBeTruthy();
      expect(repo).toBeTruthy();
    });

    it('should update', async () => {
      const udpated = await repo.update(1, new Sample({ name: 'Updated' }));
      expect(udpated).toBeTruthy();
    });

    it('should delete', async () => {
      expect(await repo.delete(1)).toBeTruthy();
    });

    it('should find one by id', async () => {
      const found = await repo.findOneBy({ id: MoreThan(0) });
      expect(found).toBeTruthy();
    });
  });
});
