import { DataSource, Entity } from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';

describe('Column', () => {
  it('should create string column', async () => {
    @Entity()
    class Sample extends BaseEntity<Sample> {}

    const r = await new DataSource({
      type: 'postgres',
      username: 'testuser',
      password: 'testdb',
      entities: [Sample],
      synchronize: true,
      dropSchema: true,
    }).initialize();

    expect(r).toBeTruthy();
  });
});
