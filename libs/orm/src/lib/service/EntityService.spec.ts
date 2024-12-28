import { EntityService } from './EntityService';
import { Sample } from './../entities/sample/Sample';
import { CreateSampleDto } from './../entities/sample/CreateSampleDto';
import { UpdateSampleDto } from './../entities/sample/UpdateSampleDto';

import { DataSource, Equal, ILike } from 'typeorm';
import { datasourceTestOptionsFactory } from './../source/data-source-options-factory';
import { Category } from '../entities/category/Category';

describe('EntityService', () => {
  let sam!: EntityService<Sample, CreateSampleDto, UpdateSampleDto>;
  let cat!: EntityService<Category>;
  let sampleData: Sample[] = [];
  let categoryData: Category[] = [];

  let ds: DataSource;

  async function tearDown() {
    sampleData = [];
    categoryData = [];
    try {
      (await cat.find()).forEach(async (e) => await cat.delete(e.id!));
      (await sam.find()).forEach(async (e) => await sam.delete(e.id!));
    } catch (err) {}
  }

  async function setup() {
    sam = new EntityService(ds.getRepository(Sample));
    cat = new EntityService(ds.getRepository(Category));

    await tearDown();

    for (let i = 1; i < 10; i++) {
      categoryData.push(await cat.save({ name: `cat ${i}` }));
    }

    sampleData.push(
      await sam.save({ sampleString: 'abcd', category: categoryData[0].id })
    );

    sampleData.push(
      await sam.save({
        sampleString: 'bcdef',
        sampleNumber: 100.99,
        category: categoryData[1].id,
      })
    );
    sampleData.push(
      await sam.save({
        sampleString: 'cdefg',
        sampleInteger: 100,
        category: categoryData[1].id,
      })
    );
    sampleData.push(
      await sam.save({
        sampleString: 'defgh',
        sampleDate: new Date(),
        category: categoryData[2].id,
      })
    );
    sampleData.push(
      await sam.save({
        sampleString: 'efghi',
        sampleObject: { value: 'value' },
        category: categoryData[2].id,
      })
    );
    sampleData.push(
      await sam.save({
        sampleString: 'fghij',
        sampleBoolean: true,
        category: categoryData[2].id,
      })
    );
    sampleData.push(
      await sam.save({
        sampleString: 'ghijk',
        sampleArray: ['a', 'b', 'c', 'd'],
      })
    );
  }

  describe('Create Read Update Delete', () => {
    beforeAll(async () => {
      ds = await new DataSource(
        datasourceTestOptionsFactory([Sample, Category], [])
      ).initialize();
      await setup();
    });

    afterAll(async () => {
      await tearDown();
    });
    it('should initialize service', () => expect(sam).toBeTruthy());
    it('should create', () => {
      expect(sampleData.length).toBeGreaterThan(0);
    });

    it('should find', async () => {
      const founds = await sam.find();
      expect(founds.length).greaterThan(0);
    });

    it('should find one by id', async () => {
      const found = await sam.findOneById(sampleData[0]!.id!);
      expect(found).toBeTruthy();
    });

    it('should update ', async () => {
      const updated = await sam.update(sampleData[0].id!, {
        sampleString: 'updated',
      });
      expect(updated).toBeTruthy();
      expect(updated.affected).toEqual(1);
      expect(updated.data![1].sampleString).toEqual('updated');
    });
  });

  describe('Entity Query', () => {
    beforeAll(async () => {
      ds = await new DataSource(
        datasourceTestOptionsFactory([Sample, Category], [])
      ).initialize();
      await setup();
    });

    afterAll(async () => {
      await tearDown();
    });
    it('should take', async () => {
      const found = await sam.find({ take: 1 });
      expect(found.length).toEqual(1);
      expect(found[0].id).toEqual(sampleData[0].id);
    });

    it('should skip', async () => {
      const found = await sam.find({ take: 1, skip: 1 });
      expect(found.length).toEqual(1);
      expect(found[0].id).toEqual(sampleData[1].id);
    });

    it('should select', async () => {
      const found = await sam.find({ take: 1, select: ['id'] });
      expect(Object.keys(found[0]).length).toEqual(1);
      expect(Object.keys(found[0]).includes('id')).toBeTruthy();
    });

    it('should order by id', async () => {
      const found = await sam.find({ order: { id: 'desc' } });
      expect(found[0].id).toBeGreaterThan(3);
    });

    it('should count', async () => {
      const { count } = await sam.count({});
      expect(count).toEqual(sampleData.length);
    });

    it('should count ', async () => {
      const { count } = await sam.count({ withDeleted: true });
      expect(count).toBe(sampleData.length);
    });

    it('should count by id', async () => {
      const { count } = await sam.count({ where: { id: sampleData[0].id! } });
      expect(count).toBe(1);
    });

    it('should count by sampleString', async () => {
      await sam.update(sampleData[0].id!, { sampleString: 'count updated 1' });
      await sam.update(sampleData[1].id!, { sampleString: 'count updated 2' });
      await sam.update(sampleData[2].id!, { sampleString: 'count updated 3' });
      const { count } = await sam.count({
        where: { sampleString: ILike('count updated%') },
      });

      expect(count).toEqual(3);
    });

    it('should set relation', async () => {
      for (let i = 0; i < 4; i++) {
        await sam.setRelation({
          id: sampleData[i].id,
          rn: 'category',
          rid: categoryData[1].id,
        });
      }

      const { count } = await sam.count({
        where: { category: Equal(categoryData[1].id) } as any,
      });
      expect(count).toBe(4);
    });

    it('should count by category', async () => {
      for (let i = 0; i < 4; i++) {
        await sam.setRelation({
          id: sampleData[i].id,
          rn: 'category',
          rid: categoryData[4].id,
        });
      }

      const { count } = await sam.count({
        where: { category: Equal(categoryData[4].id) } as any,
      });
      expect(count).toBe(4);
    });
  });

  describe('Relation Query', () => {
    beforeAll(async () => {
      ds = await new DataSource(
        datasourceTestOptionsFactory([Sample, Category], [])
      ).initialize();
      await setup();
    });

    afterAll(async () => {
      await tearDown();
    });
    it('should set relation', async () => {
      for (let i = 0; i < 3; i++) {
        await sam.setRelation({
          id: sampleData[i].id!,
          rn: 'category',
          rid: categoryData[3].id,
        });
      }

      const found = await sam.findByRelationId({
        rn: 'category',
        rid: categoryData[3].id,
      });

      expect(found.length).toBe(3);

      for (let i = 0; i < 3; i++) {
        await sam.unsetRelation({
          id: sampleData[i].id!,
          rn: 'category',
        });
      }
    });
    it('should add relation', async () => {
      for (let i = 0; i < 2; i++) {
        await sam.addRelation({
          id: sampleData[i].id!,
          rn: 'categories',
          rid: categoryData[0].id,
        });
      }

      await sam
        .createQueryBuilder('m')
        .leftJoinAndSelect('m.categories', 'categories')
        .where('categories.name = :categoryName', { categoryName: 'cat 1' })
        .getMany();

      expect(1).toBe(1);

      for (let i = 0; i < 2; i++) {
        await sam.removeRelation({
          id: sampleData[i].id!,
          rn: 'categories',
          rid: categoryData[0].id,
        });
      }
    });

    it('should find by relation', async () => {
      for (let i = 0; i < 5; i++) {
        await sam.addRelation({
          id: sampleData[i].id!,
          rid: categoryData[0].id!,
          rn: 'categories',
        });
      }

      const found = await sam.findByRelation({
        key: 'name',
        rn: 'categories',
        value: 'cat 1',
      });

      expect(found.length).toBe(5);

      for (let i = 0; i < 5; i++) {
        await sam.removeRelation({
          id: sampleData[i].id!,
          rid: categoryData[0].id!,
          rn: 'categories',
        });
      }
    });
  });

  describe('Property Query', () => {
    beforeAll(async () => {
      ds = await new DataSource(
        datasourceTestOptionsFactory([Sample, Category], [])
      ).initialize();
      await setup();
    });

    afterAll(async () => {
      await tearDown();
    });

    it('should query string property', async () => {
      let found = await sam.find({ where: { sampleString: ILike('abcd') } });
      expect(found.length).toBe(1);

      found = await sam.find({ where: { sampleString: ILike('abcd%') } });
      expect(found.length).toBe(1);

      found = await sam.find({ where: { sampleString: ILike('ab%') } });
      expect(found.length).toBe(1);

      found = await sam.find({ where: { sampleString: ILike('%cd') } });
      expect(found.length).toBe(1);
    });
  });
});
