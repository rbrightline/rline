import { Nullable } from '../var/var';
import { IDModel } from './IDModel';

export type CategoryModelRaw = {
  name: Nullable<string>;
};

export type CategoryModel = IDModel & CategoryModelRaw;

export type CreateCategoryModel = CategoryModelRaw;

export type UpdateCategoryModel = Partial<CreateCategoryModel>;
