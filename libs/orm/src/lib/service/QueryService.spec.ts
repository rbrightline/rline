import { describe, it, expect, beforeEach } from 'vitest';
import { FindManyOptions } from '@rline/type';
import { DataSource, FindOperator, Repository } from 'typeorm';
import { EntityQueryService } from './QueryService';
import { datasourceTestOptionsFactory } from '../source/data-source-options-factory';
import { Sample } from './../entities/sample/Sample';
import { Category } from './../entities/category/Category';

describe('EntityQueryService', () => {
  let ds: DataSource;
  let service: EntityQueryService<any>;
  let repo: Repository<any>;

  beforeEach(async () => {
    ds = await new DataSource(
      datasourceTestOptionsFactory([Sample, Category], [])
    ).initialize();

    repo = ds.getRepository(Sample);
    service = new EntityQueryService(repo);
  });

  describe('findAll', () => {
    it('should call repo.find with correct parameters', async () => {
      const query: FindManyOptions<Sample, FindOperator<any>> = {
        order: { id: 'ASC' },
        where: { sampleString: 'test' },
        loadEagerRelations: true,
        loadRelationIds: true,
        select: ['id', 'sampleString'],
        take: 10,
        skip: 0,
        withDeleted: false,
        relations: ['category'],
      };
      const findSpy = vi.spyOn(repo, 'find').mockResolvedValue([]);

      await service.findAll(query);

      expect(findSpy).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
        withDeleted: false,
        select: ['id', 'name'],
        order: { id: 'ASC' },
        where: { name: 'test' },
        relations: ['relation1'],
        loadEagerRelations: true,
        loadRelationIds: true,
      });
    });
  });

  describe('findOne', () => {
    it('should call repo.find with correct parameters', async () => {
      const query = {
        loadEagerRelations: true,
        loadRelationIds: true,
        relations: ['relation1'],
        select: ['id', 'name'],
        where: { id: 1 },
        withDeleted: false,
      };
      const findSpy = vi.spyOn(repo, 'find').mockResolvedValue([]);

      await service.findOne(query);

      expect(findSpy).toHaveBeenCalledWith({
        relations: ['relation1'],
        withDeleted: false,
        select: ['id', 'name'],
        where: { id: 1 },
        loadEagerRelations: true,
        loadRelationIds: true,
      });
    });
  });

  describe('count', () => {
    it('should call repo.count with correct parameters', async () => {
      const query = {
        where: { name: 'test' },
        withDeleted: false,
      };
      const countSpy = vi.spyOn(repo, 'count').mockResolvedValue(5);

      const result = await service.count(query);

      expect(countSpy).toHaveBeenCalledWith({
        where: { name: 'test' },
        withDeleted: false,
      });
      expect(result).toEqual({ count: 5 });
    });
  });
});
