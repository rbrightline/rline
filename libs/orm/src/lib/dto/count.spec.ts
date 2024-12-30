import { CountOptionsDto } from './count';
import {
  Equal,
  FindOperator,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { WhereOptions } from '@rline/type';
import { instanceToInstance } from 'class-transformer';

describe('CountOptionsDto', () => {
  it('should create an instance with default values', () => {
    const dto = instanceToInstance(new CountOptionsDto());
    expect(dto).toBeInstanceOf(CountOptionsDto);
    expect(dto.where).toBeUndefined();
    expect(dto.withDeleted).toBe(false);
  });

  it.each`
    where                              | expected
    ${'id::eq::1'}                     | ${{ id: Equal('1') }}
    ${'id::mt::1'}                     | ${{ id: MoreThan('1') }}
    ${'id::lt::1'}                     | ${{ id: LessThan('1') }}
    ${'id::mte::1'}                    | ${{ id: MoreThanOrEqual('1') }}
    ${'id::lte::1'}                    | ${{ id: LessThanOrEqual('1') }}
    ${'id::cn::1'}                     | ${{ id: ILike('%1%') }}
    ${'id::sw::1'}                     | ${{ id: ILike('1%') }}
    ${'id::ew::1'}                     | ${{ id: ILike('%1') }}
    ${['id::ew::1', 'name::cn::some']} | ${{ id: ILike('%1'), name: ILike('%some%') }}
  `('should transform $where into $expected', ({ where, expected }) => {
    let dto = new CountOptionsDto();
    dto.where = where as any;
    dto = instanceToInstance(dto);

    expect(dto.where).toEqual(expected);
  });

  it('should create an instance with provided values', () => {
    const whereOptions: WhereOptions<
      any,
      FindOperator<any>
    > = 'id::eq::1' as any;

    let dto = new CountOptionsDto();
    dto.where = whereOptions;
    dto.withDeleted = true;

    dto = instanceToInstance(dto);

    expect(dto.where).toEqual({ id: Equal('1') });
    expect(dto.withDeleted).toBe(true);
  });
});
