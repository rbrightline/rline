import axios from 'axios';
import { Category, CreateSampleDto, Sample } from '@rline/orm';

describe('Sample Module', () => {
  let samples: Sample[] = [];
  let categories: Category[] = [];

  async function setup() {
    await teardown();
    for (let i = 1; i < 5; i++) {
      const { data } = await axios.post('api/category', { name: `cat ${i}` });
      categories.push(data);
    }

    for (let i = 1; i < 5; i++) {
      const { data } = await axios.post('api/sample', {
        sampleString: `sample ${i}`,
        sampleArray: ['1', '2', '3'],
        sampleBoolean: true,
        sampleDate: new Date('10/10/1990'),
        sampleInteger: 100,
        sampleNumber: 200.5,
        sampleObject: { property: 'color', value: 'red' },
      } as CreateSampleDto);

      samples.push(data);
    }
  }

  async function teardown() {
    const { data: sampleData } = await axios.get('api/samples');
    const { data: categoryData } = await axios.get('api/categories');

    sampleData.forEach(
      async (e: Sample) =>
        await axios.delete(`api/sample/${e.id}/?hardDelete=true`)
    );
    categoryData.forEach(
      async (e: Category) =>
        await axios.delete(`api/category/${e.id}/?hardDelete=true`)
    );
  }

  beforeAll(async () => await setup());
  afterAll(async () => await teardown());

  describe('smoke', () => {
    it('should find', async () =>
      expect((await axios.get('api/samples')).data.length).toEqual(
        samples.length
      ));

    it('should find by id', async () =>
      expect((await axios.get(`api/sample/${samples[0].id}`)).data.id).toEqual(
        samples[0].id
      ));

    it('should find by id', async () =>
      expect((await axios.get(`api/sample/${samples[0].id}`)).data.id).toEqual(
        samples[0].id
      ));

    it('should count', async () =>
      expect((await axios.get('api/samples/count')).data.count).toEqual(
        samples.length
      ));
  });
});
