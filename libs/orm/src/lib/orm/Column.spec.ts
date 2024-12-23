import { DataSource, Entity } from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';

describe('Column', () => {
  it('should create string column', async () => {
    @Entity()
    class SampleColumn extends BaseEntity<SampleColumn> {}

    const r = await new DataSource({
      type: 'postgres',
      database: 'testdb',
      username: 'testuser',
      password: 'password',
      entities: [SampleColumn],
      synchronize: true,
    }).initialize();

    expect(r).toBeTruthy();
  });
});
