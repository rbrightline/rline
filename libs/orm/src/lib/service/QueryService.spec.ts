import { DataSource } from 'typeorm';
import { QueryService } from './QueryService';
import { datasourceTestOptionsFactory } from '../source/data-source-options-factory';
import { Sample } from '../entities/sample/Sample';
import { Category } from '../entities/category/Category';
import { plainToInstance } from 'class-transformer';
import { FindOptionsDto } from '../query/FindOptionsDto';
import { repeat } from '@rline/utils';
describe('QueryService', () => {
  let ds: DataSource;
  let sampleService: QueryService<Sample>;

  beforeAll(async () => {
    ds = await new DataSource(
      datasourceTestOptionsFactory([Sample, Category], [])
    ).initialize();

    let sampleRepo = ds.getRepository(Sample);

    sampleService = new QueryService(sampleRepo);

    const rnd = () => Math.floor(Math.random() * 100000000);

    let samplePromises = repeat(10, (i) => {
      return sampleRepo.save({
        sampleString: `sample ${i} ${rnd()}`,
        sampleBoolean: true,
        sampleNumber: i,
        sampleInteger: i,
        sampleArray: ['1', '2', '3'],
        sampleDate: new Date('10/10/2025'),
        sampleObject: { property: 'property', value: 'value' },
        active: true,
        info: 'Some info',
      });
    });

    await Promise.all(samplePromises);

    //...............
  });

  it('should find one by id', async () => {
    const found = await sampleService.findAll({ take: 1 });
    expect(found).toBeTruthy();
    const foundOne = await sampleService.findOneById(found[0].id!);
    expect(foundOne?.id).toBe(found[0].id);
  });

  it('should find all', async () => {
    const query = plainToInstance(FindOptionsDto, {});
    const found = await sampleService.findAll(query, {});
    expect(found).toBeTruthy();
  });

  it('should find all by select', async () => {
    const query = plainToInstance(FindOptionsDto, { select: ['id'] });
    const [first] = await sampleService.findAll(query, {});
    expect(Object.keys(first)).toEqual(['id']);
  });

  it('should find all and order by ', async () => {
    const query = plainToInstance(FindOptionsDto, {
      select: ['id'],
      orderBy: 'id',
      orderDir: 'DESC',
    });
    const [first, ...lasts] = await sampleService.findAll(query, {});

    expect(first.id).toBeGreaterThan(lasts.pop()!.id!);
  });

  it('should find all and order by ', async () => {
    const query = plainToInstance(FindOptionsDto, {
      select: ['id', 'sampleString'],
      orderBy: 'id',
      orderDir: 'ASC',
      relations: ['category', 'categories'],
    });

    const found = await sampleService.findAll(query, {});
    const [first, ...lasts] = found;

    expect(first.id).toBeLessThan(lasts.pop()!.id!);
  });
});
