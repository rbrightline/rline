import axios from 'axios';
import {
  Category,
  CreateCategoryDto,
  CreateSampleDto,
  Sample,
  UpdateSampleDto,
} from '@rline/orm';
import { DeleteResult, UpdateResult } from '@rline/type';

describe('Sample Module', () => {
  let instance = new CreateSampleDto();
  let savedCategory: Category;
  let saved: Sample;
  let dateValue = new Date();

  let categoryInstance = new CreateCategoryDto();

  beforeAll(async () => {
    instance.sampleString = 'Sample string';
    instance.sampleArray = ['first', 'second'];
    instance.sampleBoolean = true;
    instance.sampleNumber = 100.2;
    instance.sampleInteger = 100;
    instance.sampleObject = { property: 'property', value: 'Value' };
    instance.sampleDate = dateValue;
    const response = await axios.post('api/sample', instance);
    await axios.post('api/sample', instance);
    await axios.post('api/sample', instance);
    saved = response.data;

    categoryInstance.name = 'category' + Math.floor(Math.random() * 500) + 1;
    const catResponse = await axios.post('api/category', categoryInstance);
    savedCategory = catResponse.data;
  });

  it('should run before test', () => {
    expect(savedCategory).toBeTruthy();
  });
  it('should create', () => {
    expect(saved.sampleString).toEqual('Sample string');
    expect(saved.sampleArray).toEqual(['first', 'second']);
    expect(saved.sampleBoolean).toEqual(true);
    expect(saved.sampleNumber).toEqual('100.2');
    expect(saved.sampleInteger).toEqual(100);
    expect(saved.sampleObject).toEqual({
      property: 'property',
      value: 'Value',
    });
    expect(saved.sampleDate).toBe(dateValue.toISOString());
  });

  it('should find by id', async () => {
    const { data } = await axios.get(`api/sample/${saved.id}`);
    expect(data.sampleString).toEqual('Sample string');
    expect(data.sampleArray).toEqual(['first', 'second']);
    expect(data.sampleBoolean).toEqual(true);
    expect(data.sampleNumber).toEqual('100.2');
    expect(data.sampleInteger).toEqual(100);
    expect(data.sampleObject).toEqual({
      property: 'property',
      value: 'Value',
    });
  });

  it('should find all', async () => {
    const { data } = await axios.get<Sample[]>(`api/samples`);
    expect(data).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);

    const found = data.find((e) => e.id == saved.id);

    expect(found).toBeTruthy();
    expect(found!.sampleString).toEqual('Sample string');
    expect(found!.sampleArray).toEqual(['first', 'second']);
    expect(found!.sampleBoolean).toEqual(true);
    expect(found!.sampleNumber).toEqual('100.2');
    expect(found!.sampleInteger).toEqual(100);
    expect(found!.sampleObject).toEqual({
      property: 'property',
      value: 'Value',
    });
  });

  it('should find all with limit', async () => {
    const { data } = await axios.get<Sample[]>(`api/samples/?take=1`);

    expect(data.length).toEqual(1);
    expect(data[0].id).toEqual(1);
  });

  it('should find all with limit', async () => {
    const { data } = await axios.get<Sample[]>(`api/samples/?take=1&skip=1`);
    expect(data.length).toEqual(1);
    expect(data[0].id).toEqual(2);
  });

  it('should find all with select', async () => {
    const { data } = await axios.get<Sample[]>(
      `api/samples/?&select=sampleString&loadEagerRelations=false&loadRelationIds=false`
    );

    expect(data[0].sampleString).toBeTruthy();
    expect(Object.keys(data[0]).length).toEqual(1);
  });

  it('should update booelan value', async () => {
    const updated = new UpdateSampleDto();
    updated.sampleBoolean = false;

    const response = await axios.put<UpdateResult>(`api/sample/${saved.id}`, {
      sampleBoolean: updated.sampleBoolean,
    });
    const { data } = response;
    const oldData = data.data?.[0];
    const newData = data.data?.[1];
    expect(oldData).toBeTruthy();
    expect(newData).toBeTruthy();

    expect(oldData).toEqual({ sampleBoolean: instance.sampleBoolean });
    expect(newData).toEqual({ sampleBoolean: updated.sampleBoolean });
  });

  it('should update string value', async () => {
    const updated = new UpdateSampleDto();
    updated.sampleString = 'Updated Sample string';

    const response = await axios.put<UpdateResult>(`api/sample/${saved.id}`, {
      sampleString: updated.sampleString,
    });
    const { data } = response;
    const oldData = data.data?.[0];
    const newData = data.data?.[1];
    expect(oldData).toBeTruthy();
    expect(newData).toBeTruthy();

    expect(oldData).toEqual({ sampleString: instance.sampleString });
    expect(newData).toEqual({ sampleString: updated.sampleString });
  });

  it('should update number value', async () => {
    const updated = new UpdateSampleDto();
    updated.sampleNumber = 500;

    const response = await axios.put<UpdateResult>(`api/sample/${saved.id}`, {
      sampleNumber: updated.sampleNumber,
    });
    const { data } = response;
    const oldData = data.data?.[0];
    const newData = data.data?.[1];
    expect(oldData).toBeTruthy();
    expect(newData).toBeTruthy();

    expect(oldData).toEqual({ sampleNumber: instance.sampleNumber + '' });
    expect(newData).toEqual({ sampleNumber: updated.sampleNumber + '' });
  });

  it('should update date value', async () => {
    const updated = new UpdateSampleDto();
    updated.sampleDate = new Date();

    const response = await axios.put<UpdateResult>(`api/sample/${saved.id}`, {
      sampleDate: updated.sampleDate,
    });
    const { data } = response;

    const oldData = data.data?.[0];
    const newData = data.data?.[1];
    expect(oldData).toBeTruthy();
    expect(newData).toBeTruthy();

    expect(oldData).toEqual({ sampleDate: instance.sampleDate?.toISOString() });
    expect(newData).toEqual({ sampleDate: updated.sampleDate.toISOString() });
  });

  it('should update array value', async () => {
    const updated = new UpdateSampleDto();
    updated.sampleArray = ['updated'];

    const response = await axios.put<UpdateResult>(`api/sample/${saved.id}`, {
      sampleArray: updated.sampleArray,
    });
    const { data } = response;

    const oldData = data.data?.[0];
    const newData = data.data?.[1];
    expect(oldData).toBeTruthy();
    expect(newData).toBeTruthy();

    expect(oldData).toEqual({ sampleArray: instance.sampleArray });
    expect(newData).toEqual({ sampleArray: updated.sampleArray });
  });

  it('should update object value', async () => {
    const updated = new UpdateSampleDto();
    updated.sampleObject = { property: 'updated', value: 'updated' };

    const response = await axios.put<UpdateResult>(`api/sample/${saved.id}`, {
      sampleObject: updated.sampleObject,
    });
    const { data } = response;

    const oldData = data.data?.[0];
    const newData = data.data?.[1];
    expect(oldData).toBeTruthy();
    expect(newData).toBeTruthy();

    expect(oldData).toEqual({ sampleObject: instance.sampleObject });
    expect(newData).toEqual({ sampleObject: updated.sampleObject });
  });

  it('should delete', async () => {
    // const foundOne = await axios.get<Sample>(`api/sample/${saved.id}`);
    const { data } = await axios.delete<DeleteResult>(`api/sample/${saved.id}`);

    console.log(data);
    expect(data.data![0]).toBeTruthy();
  });
});
