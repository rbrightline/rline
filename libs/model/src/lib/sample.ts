import { CategoryModel } from './category';

export type SampleModel = {
  name: string;
  number: number;
  integer: number;
  boolean: boolean;
  date: Date;
  category: CategoryModel;
};
