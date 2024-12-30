import { IDModel } from './id';
import { TimestampModel } from './timestamp';

export type SampleModelObject = {
  property: string;
  value: string;
};

/**
 * Entity properties without relations and extened properties.
 */
export type SampleModelRaw = {
  sampleString?: string;
  sampleNumber?: number;
  sampleInteger?: number;
  sampleDate?: Date;
  sampleBoolean?: boolean;
  sampleObject?: SampleModelObject;
  sampleArray?: string[];
};

/**
 * Entity relation's properties.
 */
export type SampleModelRelations<Category> = {
  category?: Category;
  categories?: Category[];
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
