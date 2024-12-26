import { Nullable } from '../var/var';
import { CategoryModel } from './CategoryModel';
import { IDModel } from './IDModel';
import { TimestampModel } from './TimestampModel';

export type SampleModelObject = {
  property: Nullable<string>;
  value: Nullable<string>;
};

export type SampleModelRaw = {
  sampleString: Nullable<string>;
  sampleNumber: Nullable<number>;
  sampleInteger: Nullable<number>;
  sampleDate: Nullable<Date>;
  sampleBoolean: Nullable<boolean>;
  sampleObject: Nullable<SampleModelObject>;
  sampleArray: Nullable<Array<string>>;
  category: Nullable<CategoryModel>;
  categories: Nullable<CategoryModel[]>;
};

export type SampleModel = TimestampModel & SampleModelRaw;

export type CreateSampleModel = Omit<
  SampleModelRaw,
  'category' | 'categories'
> & {
  category: Nullable<IDModel>;
  categories: Nullable<IDModel[]>;
};

export type UpdateSampleModel = Partial<CreateSampleModel>;
