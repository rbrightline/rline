import { instanceToInstance } from 'class-transformer';
import { FindOneOptionsDto } from './find-one-options.dto';

describe('FindOneOptionsDto', () => {
  it('should create an instance with default values', () => {
    const dto = instanceToInstance(new FindOneOptionsDto());
    expect(dto.loadEagerRelations).toBe(undefined);
    expect(dto.loadRelationIds).toBe(undefined);
    expect(dto.relations).toBeUndefined();
    expect(dto.select).toBeUndefined();
    expect(dto.where).toBe(undefined);
    expect(dto.withDeleted).toBe(undefined);
  });

  it('should create an instance with provided values', () => {
    const options = {
      loadEagerRelations: true,
      loadRelationIds: true,
      relations: ['relation1', 'relation2'],
      select: ['property1', 'property2'],
      where: { id: 1 },
      withDeleted: true,
    };

    let dto = new FindOneOptionsDto(options);
    dto = instanceToInstance(dto);

    expect(dto.loadEagerRelations).toBe(true);
    expect(dto.loadRelationIds).toBe(true);
    expect(dto.relations).toEqual(['relation1', 'relation2']);
    expect(dto.select).toEqual(['property1', 'property2']);
    expect(dto.where).toEqual({ id: 1 });
    expect(dto.withDeleted).toBe(true);
  });

  it('should assign only provided values', () => {
    const options = {
      loadEagerRelations: true,
    };

    let dto = new FindOneOptionsDto(options);
    dto = instanceToInstance(dto);

    expect(dto.loadEagerRelations).toBe(true);
    expect(dto.loadRelationIds).toBeUndefined();
    expect(dto.relations).toBeUndefined();
    expect(dto.select).toBeUndefined();
    expect(dto.where).toBeUndefined();
    expect(dto.withDeleted).toBeUndefined();
  });
});
