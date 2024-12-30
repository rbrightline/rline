import { IDModel } from './id';

export type CategoryModelRaw = {
  name?: string;
};

export type CategoryModel = IDModel & CategoryModelRaw;

export type CreateCategoryModel = CategoryModelRaw;

export type UpdateCategoryModel = Partial<CreateCategoryModel>;
