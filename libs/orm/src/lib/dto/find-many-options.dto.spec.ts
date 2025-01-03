import { instanceToInstance } from 'class-transformer';
import { FindManyOptionsDto } from './find-many-options.dto';
import { Equal } from 'typeorm';

describe('FindManyOptionsDto', () => {
  it('should create an instance with default values', () => {
    const dto = instanceToInstance(new FindManyOptionsDto());
    expect(dto.take).toBe(20);
    expect(dto.skip).toBe(0);
    expect(dto.withDeleted).toBe(undefined);
    expect(dto.loadEagerRelations).toBe(undefined);
    expect(dto.loadRelationIds).toBe(undefined);
  });

  it('should create an instance with provided values', () => {
    let dto = new FindManyOptionsDto<any>({
      take: 10,
      skip: 5,
      withDeleted: true,
      select: ['id', 'name'],
      order: 'id::ASC' as any,
      where: 'name::eq::some' as any,
      relations: ['category', 'department'],
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    dto = instanceToInstance(dto);

    expect(dto.take).toBe(10);
    expect(dto.skip).toBe(5);
    expect(dto.withDeleted).toBe(true);
    expect(dto.select).toEqual(['id', 'name']);
    expect(dto.order).toEqual({ id: 'ASC' });
    expect(dto.where).toEqual({ name: Equal('some') });
    expect(dto.relations).toEqual(['category', 'department']);
    expect(dto.loadEagerRelations).toBe(false);
    expect(dto.loadRelationIds).toBe(true);
  });
});
