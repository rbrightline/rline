import { Nullable } from '../var/var';
import { IDModel } from './IDModel';
import { TimestampModel } from './TimestampModel';

export type SampleModelObject = {
  property: Nullable<string>;
  value: Nullable<string>;
};

/**
 * Entity properties without relations and extened properties.
 */
export type SampleModelRaw = {
  sampleString: Nullable<string>;
  sampleNumber: Nullable<number>;
  sampleInteger: Nullable<number>;
  sampleDate: Nullable<Date>;
  sampleBoolean: Nullable<boolean>;
  sampleObject: Nullable<SampleModelObject>;
  sampleArray: Nullable<Array<string>>;
};

/**
 * Entity relation's properties.
 */
export type SampleModelRelations<Category> = {
  category: Nullable<Category>;
  categories: Nullable<Category[]>;
};

/**
 * Entity properties with relations and extened properties.
 */
export type SampleModel<Category> = TimestampModel &
  SampleModelRaw &
  SampleModelRelations<Category>;

/**
 * Create dto for entity.
 */
export type CreateSampleModel = SampleModelRaw & SampleModelRelations<IDModel>;

/**
 * Update dto for entity.
 */
export type UpdateSampleModel = Partial<CreateSampleModel>;
